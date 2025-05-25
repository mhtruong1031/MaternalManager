import React, { ReactNode } from 'react';



const GradientPos = () => {
    const [mousePos, setMousePos] = React.useState({x: 0, y: 0});
    // const windowWidth = window.innerHeight

    React.useEffect(() => {
        const updateMousePos = (ev: any) => {
            setMousePos({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePos);
        return () => {
            window.removeEventListener('mousemove', updateMousePos);
        };
    }, []);

    return (mousePos)
};


interface GradientProps {
    children: ReactNode
    className: string
}

const Gradient:React.FC<GradientProps> = ({children, className}) => {
    return(
        <div 
            style={{
                backgroundImage: 
                    `radial-gradient( circle at 
                        ${GradientPos().x}px ${GradientPos().y}px,
                        pink, beige 50% )`
            }}
            className={className}>
            {children}
        </div>
    )
}

/*const [loading, setLoading] = useState(false);

useEffect(() => {
    setLoading(true)
    setTimeout(() => {
    setLoading(false)
    }, 3000)
}, [])

function LoadingPage {
    return(
        <div>
            <h1 className={ "text-white" }>Guardian Angel</h1>
        </div>
    )
}
*/

export default Gradient