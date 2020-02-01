import React from 'react';

import Wrapper from 'react-div-100vh';

import Header from '../Header';
import Core from '../Core';

export interface Props {}

const Component: React.FC<Props> = () => {
    return (
        <Wrapper className="no-drag">
            <style>
                {`
					:root {
						--color-header: #212121;
						--size-header: 2.5rem;

						--color-ci: #616161;
						--color-search-input: #313131;
						--color-search-button: #414141;

						--color-core: #414141;
					}
				`}
            </style>
            <Header />
			<Core />
        </Wrapper>
    );
};

export default Component;
