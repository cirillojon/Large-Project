import React, { useState, useRef } from 'react';
import logo from '../images/logoWhite.png';
import * as validator from 'validator';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const app_name = 'trendify-project'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

function displayMessage(infoMessage, flag){
    if(flag === 1){
      infoMessage.classList.remove('bg-green-600'); 
      infoMessage.classList.add('bg-red-600'); 
      infoMessage.classList.remove('hidden');
    }
    else {
      infoMessage.classList.remove('bg-red-600'); 
      infoMessage.classList.add('bg-green-600'); 
      infoMessage.classList.remove('hidden'); 
    }
  
    return;
}

function apiCall(endpoint, json, method) {
    var call = {
    method: method ? method : "POST",
    url: buildPath(endpoint),
    headers: {
    "Content-Type": "application/json",
    },
    data: json
}
return call;
}
function ResetPassword() {
    var email;
  
    const [message,setMessage] = useState('');
    const captchaRef = useRef(null);
    
    const doReset = async event => 
    {
        event.preventDefault();

        var obj = {email: email.value};
        var js = JSON.stringify(obj);
        let infoMessage = document.getElementById("error");

        const token = await captchaRef.current.executeAsync();
        captchaRef.current.reset();
        console.log("token: " + token)
  
        var config = apiCall("api/verify-human", {token});
  
        // Check first if the user is human using reCaptcha
        axios(config).then(function (response) {
          var res = response.data;
          if (res.user === "robot") {
            displayMessage(infoMessage, 1)
            setMessage('You are not human, robots are not allowed here. Get lost!');
          } 
          }).catch(function (error) {
            console.log(error);
        });

        if(email.value === ""){
            displayMessage(infoMessage, 1)
            setMessage('Please enter your email address');
            return;
        }

        if (!validator.isEmail(email.value)) {
            displayMessage(infoMessage, 1)
            setMessage('Please enter a valid email');
            return;
        }

        try
        {    
            const response = await fetch(buildPath("api/requestPasswordReset"),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if(res.error === "Email does not exist")
            {
                displayMessage(infoMessage, 1)
                setMessage('Email does not exist');
            }
            else
            {
                displayMessage(infoMessage, 2)
                setMessage('A reset link has been sent to your email address.');
            }
            
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }  
    };

    return (
        <div class = "min-h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 bg-[#20072e] bg-gray-900">
            <img select draggable="false" class="flex items-center mb-4 pb-4 " style={{ width: 250}} src={logo} alt="Trendify"></img>   
            <div class="w-full bg-[#1f2937] rounded-lg shadow border-2 md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            

                <h1 class="text-xl font-bold leading-tight tracking-regular md:text-2xl text-white">
                    Send Reset Link
                </h1>
                <p class="mb-4 text-sm font-light leading-tight tracking-regular md:text-2xl text-white">
                    Can't find the link? Please check your spam or junk folder.
                </p>

                <div class="hidden mb-4 flex items-center bg-red-600 text-white text-sm font-regular px-4 py-3" role="alert" id = "error">
                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <span id ="loginResult">{message}</span>
                </div>
            <form>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-white">Your email</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email address" class="bg-gray-50 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600  placeholder-gray-500 text-white focus:ring-blue-500 focus:border-blue-500" 
                        required="" ref={(c) => email = c}></input>
                </div>
                <button type="submit" class="mb-4 w-full text-white bg-[#8239af] hover:bg-[#713299] focus:ring-4 focus:outline-none focus:ring-[#8f4db7] font-medium rounded-full text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 mt-8 duration-300" onClick={doReset}>Send the link</button>
            
                <div class="border-t-2 border-gray-600 flex items-center content-center">
                    <p class="mt-3 text-center text-sm font-normal text-gray-400 mr-1 ml-auto">Ready to sign in?</p>
                    <a href="/" class="mr-auto text-sm font-medium text-sky-300 hover:text-sky-500 no-underline hover:underline">Click here.</a>
              </div>
              <p class="mt-2 -mb-1 text-xs text-gray-400">This site is protected by reCAPTCHA and the <a href="https://policies.google.com/privacy?hl=en-US" target="_blank" rel="noopener noreferrer" class="no-underline hover:underline text-sky-300 hover:text-sky-500">Google Privacy Policy</a> and <a href="https://policies.google.com/terms?hl=en" target="_blank" rel="noopener noreferrer" class="no-underline hover:underline text-sky-300 hover:text-sky-500">Terms of Service</a> apply.</p> 
            </form>
            </div>
            </div>
            <ReCAPTCHA
            sitekey= "6LeUVcUiAAAAACHBI-FVwAqopfU09sH73VTeB34G"
            size = "invisible"
            ref={captchaRef}
            />,
        </div>
    );
};
  
export default ResetPassword;