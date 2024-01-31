import React, { Component } from 'react';
import { Menu } from 'primereact/menu';
import "./Menu.css"
class MyMenu extends Component {

    constructor(props) {
        super(props);
        this.items = [
            {
                items: [
                    {
                        label: 'Makeup',
                        icon: 'pi pi-book',
                        command: () => {
                            // const id = window.location.href.split("users/")[1][0];
                            window.location.pathname = `/products/makeup`;
                        }
                    },
                    {
                        label: 'Skincare',
                        icon: 'pi pi-users',
                        command: () => {
                            // const id = window.location.href.split("users/")[1][0];
                            window.location.pathname = `/products/skincare`;
                        }
                    },
                    {
                        label: 'Perfumes',
                        icon: 'pi pi-users',
                        command: () => {
                            // const id = window.location.href.split("users/")[1][0];
                            window.location.pathname = `/products/perfumes`;
                        }
                    },
                    {
                        label: 'Log out',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            window.location.pathname = "/";
                        }
                    }
                ]
            },
        ];
    }

    render() {
        return (
            <div className='my-menu'>
                    <Menu model={this.items} style={{height:'100%'}} />
            </div>
        )
    }
}

export default MyMenu;