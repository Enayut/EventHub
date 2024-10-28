import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';
import { CheckIcon } from './CheckIcon';
import { useState } from 'react';
import { ethers } from 'ethers';

function WalletAmountCard() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(window.ethereum);

  const connectWallet = async (event) => {
    if (window.ethereum) {
      setIsLoading(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setProvider(provider);
      setSigner(signer);
      setIsLoading(false);
    }
  };

  return (
    <Card className=" h-[340px]">
      <CardHeader className="absolute z-10 top-2 flex-col !items-start w-full">
        <h1 className="text-center w-full text-2xl font-bold text-text">
          Your wallet
        </h1>
      </CardHeader>
      <CardBody className="absolute z-10 top-[160px] w-full flex justify-center items-center scale-150">
        {!provider && (
          <Button
            className="align-center"
            isLoading={isLoading}
            onClick={(e) => {
              connectWallet(e);
            }}
          >
            Connect Wallet
          </Button>
        )}
        {provider && (
          <Chip
            className="align-center"
            startContent={<CheckIcon size={18} />}
            variant="faded"
            color="success"
          >
            Wallet connected
          </Chip>
        )}
      </CardBody>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0  object-cover blur-sm"
        src="https://nextui.org/images/card-example-4.jpeg"
      />
    </Card>
  );
}

export default WalletAmountCard;
