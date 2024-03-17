/**
 * @fileoverview Session Timeout
 * @description This file contains the error response handler for all routes
 */


import { Request, Response, NextFunction } from 'express';
import { useEffect } from 'react';

export default function sessionTimer(req: Request, res: Response, next: NextFunction) {

    // function check for inactivity and log out if detected
    const checkForInactivity = () => {

        // get expire time from local storage
        const expiryTime = Number(localStorage.getItem("expireTime"));
        let currentTime = Date.now();


        // if the time now is beyond the set expiry time, log out
        if (expiryTime < currentTime) {
            
            //insert logout code
        }

    }

    // function to update expire time 
    const updateExpireTime = () => {

        // set expiry time to -> 30 MINUTES <- from now
        const offset = 30 * 1000;
        const expiryTime = (Date.now() + offset).toString();
        
        localStorage.setItem("expireTime", expiryTime);

    }

    // 
    useEffect{() => {
        // check for inactivity every -> 5 SECONDS <-
        const interval = setInterval(() => {
            checkForInactivity();
        }, 5000);

        //clear interval on unmount
        return () => clearInterval(interval);

    }, []};

    // detecting user activity and refresh the expiry time if meron
    useEffect{() => {

        // set initial expiry time
        updateExpireTime();

        // set event listeners
        window.addEventListener("click", updateExpireTime);
        window.addEventListener("keypress", updateExpireTime);
        window.addEventListener("scroll", updateExpireTime);
        window.addEventListener("mousemove", updateExpireTime);

        // clear up
        return () => {
            window.removeEventListener("click", updateExpireTime);
            window.removeEventListener("keypress", updateExpireTime);
            window.removeEventListener("scroll", updateExpireTime);
            window.removeEventListener("mousemove", updateExpireTime);
        }

    }, []};

    
}