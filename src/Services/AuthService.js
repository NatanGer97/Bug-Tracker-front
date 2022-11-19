 const SignOut = ()=>
{
    localStorage.removeItem('token');
    
};


const AuthService = {SignOut,}

export default AuthService;


