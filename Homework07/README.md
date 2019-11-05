# The Peace Project

---

## Overview

People in recovery need a place where they can go to keep track of their progress to break the cycle of addiction. With The Peace Project, users can enter daily check-in data, use resources to get through small moments of need, and look at how they have progressed over their last seven check-ins to see trends on the road to a healthy lifestyle. The goal is to give relief and a sense of accomplishment to any user that needs it as the sole method of assistance for smaller issues or as part of a larger program for bigger ones. The Peace Project empowers users to **Check In** with their current mood and confidence about their program, visit their **Happy Place** for simple distractions, coping mechanisms, and encouragement, track their **Progress**, and **Visualize** their data over time.

### Check In

The Check In page first prompts the user to enter their name and sobriety date, which they can change at any time from any page using the settings button. After that information is first entered, however, the Check In page only prompts them to input their current mood and their confidence in their recovery. These check-ins use local storage to save the date of the check-in and the values of their inputs on a 1-5 scale. They can refresh the page if they feel the need to check in later the same day.

### Happy Place

The Happy Place page is an API-heavy toolkit that provides distraction, coping skills, and encouragement for the user. The user can click any button on the page to dynamically display a new element. In our current version, that includes cute or funny (or weird) cat gifs, inspirational quotes, dad jokes, and they can even play calming music to help center themselves.

### Progress

The Progress page displays two dynamic counters - one that tracks their total length of successful recovery, called their "clean streak," and another that tracks their consecutive daily check-ins, called their "check-in streak." The former element is dynamic in that if they have less than a year in recovery, it will not display their years, and if they have less than a month in recovery, it will also not display their months. This means the user is not discouraged by seeing two looming zeroes on their screen when they are early on in recovery. The check-in streak was carefully designed to only increase if the user's previous check in was yesterday. If they check in multiple times on the same day, it will not increment. If their most recent check in was two or more days ago, the counter will reset to 0.

### Visualize
On the Visualize page, the user can observe a dual line graph that compares their mood and recovery confidence side by side. From here they are able to determine for themselves whether or not their mood affects their program of recovery on a day to day basis. 
