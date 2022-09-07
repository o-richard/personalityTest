import React, { useState, useEffect } from 'react';

// Displays the basic layout inherited by the Homepage and Page where the client enters a description of theselves
function HomeLayout(props) {
    // Ensures the page displays the loader animation for 1 second
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            { loading ? 
            (
            <div className="loader-container">
                <div className="spinner"></div>
            </div> 
            )
            :
            (
            props.main_body
            )
            }
        </>
    );
}
export default HomeLayout;