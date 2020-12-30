# Link to sign in

```
https://passport.yandex.ru/auth
	?from=mail
	&login=alexey@presniy.com
	&origin=hostroot_homer_auth_ru
	&retpath=https%3A%2F%2Fmail.yandex.ru%2F%3Fuid%3D1130000048606586%23message%2F174514485560606722
	&backpath=https%3A%2F%2Fmail.yandex.ru%3Fnoretpath%3D1
```

Parameters:
* `login`, set exactly the login we need
* `retpath`, contains message id so that after authorization, 
a user sees the concrete message.

# How to create a html template in gmail

Watch youtube video [How to Create HTML Email in Gmail](https://www.youtube.com/watch?v=ZSSqsEVsChc)
from Amit Agarwal, Google Developer Expert.

# How to create a new email

There is the online editor for MJML: [MJML Online Editor](https://mjml.io/try-it-live/Hk2BF6loP).

You can stick to the following algorithm:

1. Open the Online Editor.
2. Prepare a template.
3. Copy it to the file on the repo.
4. Build it with the mjml package and get a html as an output.
5. Prepare the email in gmail with the content of the generated file. 
Check whether everything is ok.
6. If yes, just commit the new email template to the repo.
7. If no, fix it and repeat points 3-6.
