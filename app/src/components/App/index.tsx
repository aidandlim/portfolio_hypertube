import React from 'react';

import Wrapper from 'react-div-100vh';

import { BrowserRouter } from 'react-router-dom';

import Header from '../Header';
import Core from '../Core';

export interface Props {}

const Component: React.FC<Props> = () => {
    return (
        <Wrapper className="no-drag">
            <style>
                {`
					:root {
                        --size-header: 2.5rem;
                        
                        --color-100: #000000;
                        --color-95: #050505;
                        --color-90: #101010;
                        --color-85: #151515;
                        --color-80: #202020;
                        --color-75: #252525;
                        --color-70: #303030;
                        --color-65: #353535;
                        --color-60: #404040;
                        --color-55: #454545;
                        --color-50: #505050;
                        --color-45: #555555;
                        --color-40: #606060;
                        --color-35: #656565;
                        --color-30: #707070;
                        --color-25: #757575;
                        --color-20: #808080;
                        --color-15: #858585;
                        --color-10: #909090;
                        --color-5: #959595;
                        --color-A: #AAAAAA;
                        --color-B: #BBBBBB;
                        --color-C: #CCCCCC;
                        --color-D: #DDDDDD;
                        --color-E: #EEEEEE;
                        --color-F: #FFFFFF;

                        --color-primary: #FFEA00;
                        --color-primary-light: #FFFF8D;
					}
				`}
            </style>
            <BrowserRouter>
                <Header />
                <Core />
            </BrowserRouter>
        </Wrapper>
    );
};

export default Component;
