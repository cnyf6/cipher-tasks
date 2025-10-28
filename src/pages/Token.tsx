import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import abi from '@/abi/ERC7984Token.json';
import config from '@/config/env';
import { usePrivateToken } from '@/hooks/usePrivateToken';

const TokenPage = () => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const { transfer, getBalance, isTransferring, isLoadingBalance } = usePrivateToken(
    config.contractAddress,
    abi as any
  );

  const onTransfer = async () => {
    if (!to || !amount) {
      setError('Please fill in all fields');
      return;
    }

    setError(null);
    const result = await transfer(to, amount);

    if (result.success) {
      toast({
        title: 'Transfer Successful',
        description: `Successfully transferred ${amount} tokens to ${to}`,
      });
      setTo('');
      setAmount('');
    } else {
      setError(result.error || 'Transfer failed');
      toast({
        title: 'Transfer Failed',
        description: result.error || 'An error occurred during transfer',
        variant: 'destructive',
      });
    }
  };

  const onGetBalance = async () => {
    setError(null);
    try {
      const res = await getBalance();
      setBalance(res);
      toast({
        title: 'Balance Retrieved',
        description: 'Your encrypted balance has been decrypted successfully',
      });
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to retrieve balance';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Private Token</h1>

      {error && (
        <Alert variant="destructive" className="mb-4 max-w-xl">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 max-w-xl">
        <Input
          placeholder="Recipient address (0x...)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          disabled={isTransferring}
        />
        <Input
          placeholder="Amount (e.g. 1.23)"
          type="number"
          step="0.000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isTransferring}
        />
        <div className="flex gap-3">
          <Button onClick={onTransfer} disabled={isTransferring || isLoadingBalance}>
            {isTransferring ? 'Transferring...' : 'Transfer'}
          </Button>
          <Button variant="outline" onClick={onGetBalance} disabled={isTransferring || isLoadingBalance}>
            {isLoadingBalance ? 'Loading...' : 'Get My Balance'}
          </Button>
        </div>
        {balance !== null && (
          <div className="mt-2 p-4 bg-muted rounded-md">
            <p className="text-sm font-medium">Decrypted Balance</p>
            <p className="text-2xl font-bold">{String(balance)} wei</p>
            <p className="text-xs text-muted-foreground mt-1">
              ≈ {(Number(balance) / 1e18).toFixed(6)} tokens
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 max-w-xl">
        <h2 className="text-lg font-semibold mb-2">How it works</h2>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>All amounts are encrypted using FHE (Fully Homomorphic Encryption)</li>
          <li>Your balance remains private and encrypted on-chain</li>
          <li>Only you can decrypt your balance</li>
          <li>Transfers are processed without revealing amounts to others</li>
        </ul>
      </div>
    </div>
  );
};

export default TokenPage;


