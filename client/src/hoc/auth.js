import React,{useEffect} from 'react';
import { auth } from '../_actions/user_action'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Auth (SpecificComponent,option, adminRoute = null){
  
   
    function AuthenticationCheck(){
    
        const dispatch = useDispatch();
        const navigate = useNavigate();
        
        useEffect(() => {
           dispatch(auth())
            .then(res=>{
                if(!res.payload.isAuth){
                    if(option){
                        navigate("/login");
                    }
                }else{
                   if(adminRoute && !res.payload.isAuth){
                    navigate("/");
                   }else{
                    if(!option){
                        navigate("/");
                    }
                   }
                }
            })
        },[dispatch,navigate])
       
        return(
            <SpecificComponent/>
        )
    }
    
   return AuthenticationCheck

}

export default Auth;