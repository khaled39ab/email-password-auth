const handleLogIn = event => {
    event.preventDefault();
}

const handleEmailBlur = (event) => {
    console.log(event.target.value);
}

const handlePasswordBlur = (event) =>{
    console.log(event.target.value);
}

export {
    handleLogIn,
    handleEmailBlur,
    handlePasswordBlur
};