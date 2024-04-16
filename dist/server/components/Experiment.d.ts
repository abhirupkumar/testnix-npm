import * as React from 'react';
import { ReactNode } from 'react';
import "server-only";
export type ExperimentProps = {
    experimentId: string;
    children: ReactNode;
    experimentHash: string;
};
declare const Experiment: ({ experimentId, children, experimentHash }: ExperimentProps) => Promise<React.JSX.Element>;
export { Experiment as default };
