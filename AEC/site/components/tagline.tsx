import React from 'react'

export default function Tagline(props) {
    return (
        <div className={props.className} style={{
            width: "100%",
            color: (props.color ? props.color : "#888"),
            fontSize: "1.2rem",
            position: "relative",
            fontWeight: props.bold ? "bold" : 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <hr style={{
                position: "absolute",
                zIndex: 2,
                left: 0,
                right: 0,
                top: "0.2rem",
                borderTop: "2px solid " + (props.color ? props.color : "#ccc")
            }} />
            <p style={{
                background: props.background ? props.background : "#F4F4F5",
                position: 'relative',
                zIndex: 2,
                padding: "0 10px",
                margin: "0"
            }}>
                {props.children}

            </p>
        </div>
    )
}
