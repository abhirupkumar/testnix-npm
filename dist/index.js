import * as React from 'react';
import { Children, isValidElement } from 'react';
import 'server-only';

const Variant = ({ variantId, children }) => {
    if (!variantId || variantId == "") {
        throw new Error("[TestNix] Please enter a unique Variant Id.");
    }
    return (React.createElement(React.Fragment, null, children));
};
Variant.displayName = 'Textnix.Variant';

const Experiment = async ({ experimentId, children, experimentHash }) => {
    let allVariants = [];
    Children.map(children, (child) => {
        if (!isValidElement(child))
            throw new Error('Invalid Variant Element');
        const currVariantId = child.props.variantId;
        if (allVariants.find(v => v === currVariantId)) {
            throw new Error("[TestNix] Make sure all Variant Ids inside your Experiment are unique.");
        }
        if (!currVariantId || currVariantId == "") {
            throw new Error("[TestNix] Please enter a unique Variant Id.");
        }
        allVariants.push(currVariantId);
    });
    const fetchedVariant = await fetch(`https://testnix.vercel.app/api/v1/variant`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hash: experimentHash, variantIds: allVariants, experimentId }),
    });
    const fetchedData = await fetchedVariant.json();
    if (fetchedData.success == false) {
        throw new Error(fetchedData.error);
    }
    const variantId = fetchedData.data;
    return (React.createElement(React.Fragment, null, Children.map(children, (child) => {
        const currVariantId = child.props.variantId;
        if (currVariantId === variantId) {
            return child;
        }
    })));
};

export { Experiment, Variant };
