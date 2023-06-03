'use client';

import LottieDiv, { LottieComponentProps } from "lottie-react";

export function Lottie({ ...rest }: LottieComponentProps) {

    return <LottieDiv
        {...rest}
        loop
        autoPlay
    />
}