import React from 'react';

const DropdownChildComp = props => {
    const [visibilityAnimation, setVisibilityAnimation] = React.useState(false);
    const [repeat, setRepeat] = React.useState(null);

    React.useEffect(() => {
        if (props.visibility) {
            clearTimeout(repeat);
            setRepeat(null);
            setVisibilityAnimation(true);
        } else {
            setRepeat(setTimeout(() => {
                setVisibilityAnimation(false);
            }, 400));
        }
    }, [props.visibility]);

    return (
        <div className={`cre_components-dropdown ${props.visibility ? 'cre_slide-fade-in-dropdown' : 'cre_slide-fade-out-dropdown'}`}>
            { visibilityAnimation && props.children }
        </div>
    )
};


export default DropdownChildComp;