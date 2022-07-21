import React, { ReactElement } from 'react'
import Header from './header/Header'
import styled from "styled-components";
import { Box } from '../../Box';

const Body = styled(Box).attrs({
    maxWidth:'xl',
    sx:{marginInline:'auto', marginTop:'65px'}
})``;

interface DefaultLayoutProps {
    children: ReactElement | ReactElement[]
}

const DefaultLayout = ({children}:DefaultLayoutProps) => {
    return (
        <>
            <Header />
            <Body>
                {children}
            </Body>
        </>
    )
}

export default DefaultLayout