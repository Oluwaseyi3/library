import { Col, Image, Row, Menu, Layout } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import React from 'react';
import Account from '../Account';

import { useRouter } from 'next/router';
import SubMenu from 'antd/lib/menu/SubMenu';
import { MenuOutlined } from '@ant-design/icons';
import OutlineButton from '../Button/Outline';


const Nav = styled(Layout.Header)`
    width: 100vw;
    height: 66px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 29px #00000012;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 10;
`;

const NavContainer = styled(Row)`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    height: 66px;
`;

const Logo = styled(Image)`
    margin-top: 10px;
    margin-left: 55px;
`;

const MenuCol = styled(Col)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 100%;

    @media (max-width: 768px) {
        visibility: hidden;
        width: 0px;
    }

    @media (min-width: 768px) {
        visibility: visible;
        width: auto;
    }
`;

const NavMenuItem = styled.div`
    height: 100%;
    width: auto;
    padding: 3px 0px 1px 0px;
    margin: 0px 20px 0px 20px;
    display: flex !important;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.primary};
    font-size: 16px;
    flex-grow: 0;

    &:hover {
        color: ${(props) => props.theme.primary};
        border-bottom: 2px solid ${(props) => props.theme.primary};
        padding: 5px 0px 1px 0px;
    }

    a {
        color: ${(props) => props.theme.primary};
    }
`;

const NavMenuCol = styled(Col)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    @media (max-width: 768px) {
        visibility: visible;
        width: auto;
    }

    @media (min-width: 768px) {
        visibility: hidden;
        width: 0px;
    }
`;

const Navbar: React.FC = (): React.ReactElement => {
    const router = useRouter();
    console.log(router.pathname);



    const activeStyle = {
        borderBottom: '2px solid #E7694C',
        padding: '5px 0px 1px 0px',
    };

    return (
        <Nav>
            <NavContainer justify="center" align="middle">
                <Col xs={10} sm={10} md={4} style={{ height: '100%' }}>
                    <Link href="/">
                       
                            <Logo height="55px" width="55px" src="../assets/derpfi.png" alt="" preview={false} />
                    
                    </Link>
                </Col>
                <MenuCol xs={0} sm={0} md={20} style={{ height: '100%' }}>
                    <NavMenuItem style={'/funds' == router.pathname ? activeStyle : {}}>
                        <Link href="/funds">
                           Funds
                        </Link>
                    </NavMenuItem>
                    <NavMenuItem style={'/staking' == router.pathname ? activeStyle : {}}>
                        <Link href="/staking">
                            Staking
                        </Link>
                    </NavMenuItem>
                    <NavMenuItem>
                        <Account  />
                    </NavMenuItem>
                   
                </MenuCol>
                <NavMenuCol xs={14} sm={14} md={0} style={{ height: '100%' }}>
                    <Menu mode="horizontal" triggerSubMenuAction="click">
                        <SubMenu key="SubMenu" icon={<MenuOutlined />} title="Menu">
                            <Menu.ItemGroup title="Bundle">
                                <Menu.Item key="bdl">
                                    <Link href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x7ff78e1cab9a2710eb6486ecbf3d94d125039364">
                                      Buy BDL
                                    </Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="Navigation">
                                <Menu.Item key="/funds">
                                    <Link href="/funds">
                                        Funds
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/staking" style={'/staking' == router.pathname ? activeStyle : {}}>
                                    <Link href="/staking">
                                        Staking
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/staking" style={'/staking' == router.pathname ? activeStyle : {}}>
                                    
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="Wallet">
                                <Menu.Item key="wallet">
                                    <Account  />
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                    </Menu>
                </NavMenuCol>
            </NavContainer>
        </Nav>
    );
};

export default Navbar;
