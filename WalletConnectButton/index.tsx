import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { useCallback } from 'react';

import { ConnectKitButton, useModal } from 'connectkit';

import { walletMetamask, walletWalletConnect } from '@/utils/images';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCustomModalContext } from '@/contexts/CustomModalContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DefaultButton from '@/components/CustomButton/DefaultButton';

interface WalletConnectButtonProps {
    buttonLabel?: React.ReactNode;
    isLoggedIn?: boolean;
    walletAddress?: string;
    authKey?: string;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
    buttonLabel,
    isLoggedIn,
    walletAddress,
    authKey,
}) => {
    const { connectors, handleSignIn, handleSignOut } = useAuthContext();
    const { openModal } = useCustomModalContext();
    const { openSwitchNetworks, openSIWE } = useModal();
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    // #region FIXME: 확인 후 삭제
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const openWalletConnectModal = useCallback(() => {
        const isMetaMaskMobile = () => {
            const { userAgent } = navigator;
            return /metamaskmobile/i.test(userAgent);
        };
        const isMobile = () => {
            const { userAgent } = navigator;
            return /android|ipad|iphone|ipod/i.test(userAgent);
        };

        const checkMetaMask = () => {
            const url = `https://metamask.app.link/dapp/${window.location.host}`;
            const timeout = 1000;

            const openMetaMask = setTimeout(() => {
                // MetaMask가 설치되지 않았음
                console.log('MetaMask is not installed');
            }, timeout);

            window.location.replace(url);

            window.addEventListener('blur', () => {
                clearTimeout(openMetaMask);
                // MetaMask가 설치됨
                console.log('MetaMask is installed');
            });
        };
        openModal({
            modalTitle: 'Connect Your Wallet',
            modalBody: (
                <>
                    <p>Please select a wallet from below to connect and launch your IGO.</p>
                    <ul className="wallet__list">
                        {connectors
                            .filter(
                                (connector) =>
                                    connector.id === 'metaMaskSDK' ||
                                    (!isMetaMaskMobile() && connector.id === 'walletConnect'),
                            )
                            .map((connector) => {
                                return (
                                    <li
                                        className="wallet__list-item"
                                        key={connector.id}
                                        id={`wallet-list-item-${connector.id}`}
                                    >
                                        <Link
                                            href={`connect${connector.name}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (
                                                    connector.id === 'metaMaskSDK' &&
                                                    isMobile() &&
                                                    !isMetaMaskMobile()
                                                ) {
                                                    checkMetaMask();
                                                } else {
                                                    void handleSignIn(connector);
                                                }
                                            }}
                                        >
                                            {' '}
                                            <span>
                                                {connector.id === 'metaMaskSDK' && (
                                                    <Image src={walletMetamask} alt={connector.name} />
                                                )}
                                                {connector.id === 'walletConnect' && (
                                                    <Image src={walletWalletConnect} alt={connector.name} />
                                                )}
                                            </span>{' '}
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                    <p>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        By connecting your wallet, you agree to our <Link href="#">Terms of Service</Link> and our{' '}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link href="#">Privacy Policy</Link> .
                    </p>
                </>
            ),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal, currentLocale]);
    // #endregion

    if ((isLoggedIn && walletAddress) || authKey) {
        const addressOrKeyValue = authKey || walletAddress || '';
        return (
            <div
                className="pro-details__links-btn positionR"
                onClick={handleSignOut}
                style={{ color: '#C1C7CB', cursor: 'pointer', paddingRight: '2.5rem' }}
            >
                <i className="fa-solid fa-wallet" style={{ marginRight: '5px' }} />
                {addressOrKeyValue.length > 9
                    ? `${addressOrKeyValue.slice(0, 5)}...${addressOrKeyValue.slice(addressOrKeyValue.length - 3)}`
                    : addressOrKeyValue}
                <span className="mr1 positionA">
                    <i className="fa-solid fa-arrow-right-from-bracket" />
                </span>
            </div>
        );
    }
    return (
        <ConnectKitButton.Custom>
            {({ show, isConnected, chain }) => {
                return (
                    <DefaultButton
                        onClick={() => {
                            if (isConnected) {
                                if (!chain || chain.id !== parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)) {
                                    openSwitchNetworks();
                                } else {
                                    openSIWE(false);
                                }
                            } else {
                                show?.();
                            }
                        }}
                        label={
                            buttonLabel || (
                                <>
                                    <span className="mr1">Connect</span>
                                    <i className="fa-solid fa-wallet" />
                                </>
                            )
                        }
                    />
                );
            }}
        </ConnectKitButton.Custom>
    );
};

export default WalletConnectButton;
