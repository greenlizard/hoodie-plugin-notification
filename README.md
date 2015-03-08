hoodie-plugin-notification
====================
[![Build Status](https://travis-ci.org/greenlizard/hoodie-plugin-notification.svg?branch=master)](https://travis-ci.org/greenlizard/hoodie-plugin-notification) [![Dependencies](https://david-dm.org/greenlizard/hoodie-plugin-notification.png)](https://david-dm.org/greenlizard/hoodie-plugin-notification) [![devDependency Status](https://david-dm.org/greenlizard/hoodie-plugin-notification/dev-status.svg)](https://david-dm.org/greenlizard/hoodie-plugin-notification#info=devDependencies) [![Code Climate](https://codeclimate.com/github/greenlizard/hoodie-plugin-notification/badges/gpa.svg)](https://codeclimate.com/github/greenlizard/hoodie-plugin-notification)

## Dependencies
```shell
  hoodie install hoodie-plugin-notification
```
for cordova/phonegap users
```shell
  bower install hoodie-plugin-notification
```

## Setup client
```html
 <script src="/_api/_files/hoodie.js"></script>
```
for cordova/phonegap users

```html
  <script src="<bowerdir>/hoodie/dist/hoodie.js"></script>
  <script src="<bowerdir>/hoodie-plugin-notification/hoodie.notification.js"></script>
```

## API (Dream Code)
-  [x] hoodie.notification.follow(login)
-  [x] hoodie.notification.unfollow(login)
-  [x] hoodie.notification.post({text: 'text'}, /*opitional*/ {type: [mediaplugin.enum]})
-  [x] hoodie.notification.getPost({id: 'postId')
-  [x] hoodie.notification.updatePost({id: 'postId',text: 'text'}, /*opitional*/ {type: [mediaplugin.enum]})
-  [x] hoodie.notification.deletePost({id: 'postId'}, /*opitional*/ {type: [mediaplugin.enum]})
-  [x] hoodie.notification.comment(postId, {text:'text'})
-  [x] hoodie.notification.updateComment({ id: 'postId'}, {id: 'commentId'})
-  [x] hoodie.notification.deleteComment({ id: 'postId'}, {id: 'commentId'})
-  [x] hoodie.notification.count(postId, [type.enum]) 
-  [x] hoodie.notification.uncount(postId, [type.enum])
-  [x] hoodie.notification.like(postId) 
-  [x] hoodie.notification.unlike(postId)
-  [x] hoodie.notification.feed(postId)
-  [x] hoodie.notification.share(postId)
-  [x] hoodie.notification.abuse(postId)
-  [x] hoodie.notification.following(/*opitional*/ login)
-  [x] hoodie.notification.followers(/*opitional*/ login)
-  [x] hoodie.notification.getProfile(/*opitional*/ login)
-  [x] hoodie.notification.updateProfile(/*opitional*/ login, profileObject)
