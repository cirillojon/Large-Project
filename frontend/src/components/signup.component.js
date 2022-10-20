import React, { useState } from 'react'
import logo from '../images/logoWhite.png';

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

function Signup() {
  var email;
  var password;
  var confirmPassword;
  var name;

  const [message,setMessage] = useState('');

  const doSignup = async event => 
  {
      event.preventDefault();

      var obj = {login:email.value, password:password.value, name:name.value};
      var js = JSON.stringify(obj);
      let extendSearch = document.getElementById("error");

      try
      {    
          const response = await fetch(buildPath("api/register"),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var res = JSON.parse(await response.text());

          if(res.error !== "")
          {
            extendSearch.classList.remove('hidden');  
            setMessage('User/Password combination incorrect');
          }
          else
          {
            window.location.href = '/landing';
          }
          
      }
      catch(e)
      {
          alert(e.toString());
          return;
      }    
  };

  return (
    <div class="min-h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 bg-gray-900">
        <img select draggable="false" class="flex items-center mb-4 pb-4" style={{ width: 250}} src={logo} alt="Trendify"></img>   
        <div class="w-full rounded-lg shadow border-2 md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-regular md:text-2xl text-white">
              Sign up with your email address
            </h1>

            <div class="hidden mb-4 flex items-center bg-red-600 text-white text-sm font-regular px-4 py-3" role="alert" id = "error">
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
              <span id ="loginResult"></span>
            </div>

            <form class="space-y-4 md:space-y-6" onSubmit={doSignup}>
              <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-white">What should we call you?</label>
                  <input type="" name="name" id="name" class="bg-gray-50 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600  placeholder-gray-500 text-white focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter your name" required=""  ref={(c) => name = c}></input>
              </div>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-white">What's your email?</label>
                  <input type="" name="email" id="email" class="bg-gray-50 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600  placeholder-gray-500 text-white focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Email address" required="" ref={(c) => email = c}></input>
              </div>
              <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="Password" class="bg-gray-50 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600  placeholder-gray-500 text-white focus:ring-blue-500 focus:border-blue-500" 
                    required="" ref={(c) => password = c}></input>
              </div>
              <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-white">Confirm Password</label>
                  <input type="password" name="password" id="confirmPassword" placeholder="Enter your password again" class="bg-gray-50 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600  placeholder-gray-500 text-white focus:ring-blue-500 focus:border-blue-500" 
                    required="" ref={(c) => confirmPassword = c}></input>
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" required=""></input>
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="font-light text-gray-500 text-gray-300">I accept the <a class="no-underline font-medium text-primary-600 hover:underline text-primary-500" href="https://www.termsandconditionsgenerator.com/live.php?token=etWJMR2qa5qehEcvVYyak0qiAVxQxH0D">Terms and Conditions</a></label>
                </div>
              </div>

              <button onClick={doSignup} type="submit" class="w-full text-white bg-[#8239af] hover:bg-[#713299] focus:ring-4 focus:outline-none focus:ring-[#8f4db7] font-medium rounded-full text-sm px-5 py-2.5 text-center focus:ring-primary-800">Submit the form</button>
              <div class="border-t-2 border-gray-600 flex items-center content-center">
                <p class="mt-3 text-center text-sm font-normal text-gray-400 mr-1 ml-auto">Already have an account?</p>
                <a href="/" class="mr-auto text-sm font-medium text-primary-600 no-underline hover:underline">Login here</a>
              </div>
            </form>
          </div>
        </div>
    </div>
    );
  };
    
  export default Signup;