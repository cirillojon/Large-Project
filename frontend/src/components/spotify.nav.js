import { useEffect, useRef, useState } from 'react'
import {NavLink, BrowserRouter, Switch, Route} from 'react-router-dom'

export default function Navigation() {

  return (
    <div class="z-50 fixed bottom-0 border-card lg:left-0 w-full lg:w-24 bg-black shadow-inner lg:h-screen text-white lg:pt-16">
      <div class='lg:mt-16 lg:space-y-4 flex lg:flex-col justify-between h-auto'>
        <NavLink class='flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 w-1/5 lg:w-full' exact to='/'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-10 h-10 text-slate-300 hover:text-black">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p class = "no-underline">Profile</p>
          </div>
          
        </NavLink>
      </div>
    </div>
  )
};