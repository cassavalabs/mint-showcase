import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { injected } from "@cassavaland/sdk";

export function useEagerConnect() {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState<boolean>(false);

  useEffect(() => {
    if (!active) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        }
      });
    }
  }, [activate, active]);

  /**
   * if the connection worked,
   * wait until we get confirmation of that to flip the flag
   */
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { activate, active, error } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          activate(injected, undefined, true).catch((err) => {
            console.error("Error handling account changed event", err);
          });
        }
      };

      const handleChainChanged = () => {
        activate(injected, undefined, true).catch((err) => {
          console.error("Error handling chain changed event", err);
        });
      };

      //   const handleNetworkChanged = () => {
      //     activate(injected, undefined, true).catch((err) => {
      //       console.error("Error handling network changed event", err);
      //     });
      //   };

      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", handleChainChanged);
      //   ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("chainChanged", handleChainChanged);
          //   ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }

    return undefined;
  }, [active, error, suppress, activate]);
}

export function useActiveWeb3() {
  const interfaceContext = useWeb3React<Web3Provider>();
  // const interfaceNetworkContext = useWeb3React<Web3Provider>("NETWORK");

  // if (interfaceContext.active) {
  return interfaceContext;
  // }

  // return interfaceNetworkContext;
}
