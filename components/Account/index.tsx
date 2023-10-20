import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import OutlinedButton from '../Button/Outline';
function shortenHex(hex: string, length: number = 4): string {
    return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
}
function Account() {
    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })

    function shortenHex(hex: any, length: number = 4): string {
        return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
    } 
   
    if (isConnected) return <div>Connected to {`${shortenHex(address, 4)}`}</div>
    return <OutlinedButton onClick={() => connect()}>Connect Wallet</OutlinedButton>
  }

  export default Account;