# BLOG with Express and TDD

## **Table of Contents**
- [Description](#description)
- [URL](#url)
- [Method](#method)

## <a id="description"></a> Description
This program is created to train in the proficiency of using Test-Driven Development (TDD)

## <a id="url"></a> URL
http://localhost:3000/blog

## <a id="method"></a>Method
# Route | HTTP | Description
------|------|------------
/blog/articles | GET | View all articles stored in database

## Data Params
None

## Success Response

Code: 200

Content: 

    {
        message: "Data retrieval success",
        data: 
        [
            {
                <article properties here>
            }
        ]
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/blog/articles/user | GET | View all articles for the user logged in

## Data Params
NONE

## Success Response

Code: 200

Content: 

    {
        message: "Data retrieval success",
        data: 
        [
            {
                <article properties here>
            }
        ]
    }

## Error Response

Code: 400

Content: 

    {
        message: 'User is no longer with us',
        note: 'Please see console log for details'
    }

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/blog/articles/user/create | POST | Create an article attributed to the user logged in

## Data Params
name: "Article Name"
- type: String

body: "Insert Article Text Here"
- type: String

## Success Response

Code: 201

Content: 

    {
        message: "Article successfully created",
        data: 
        [
            {
                <article properties here>
            }
        ]
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/blog/articles/user/edit | PUT | Edit an article belonging to the user logged in

## Data Params
articleId: "Article id"
- type: Mongoose ObjectId

name: "Article Edited Name"
- type: String

body: "Edited Article Text Here"
- type: String

## Success Response

Code: 200

Content: 

    {
        message: "Article successfully edited",
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/blog/articles/user/delete | DELETE | Delete an article belonging to the user logged in

## Data Params
articleId: "Article id"
- type: Mongoose ObjectId

## Success Response

Code: 200

Content: 

    {
        message: "Article successfully deleted",
    }

## Error Response

Code: 400

Content:

    {
        message: You are not the owner of this article
    }

    Ocurrence: when a user enters articleId that does not belong to them

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/blog/signin | POST | log in into the site

## Data Params
email: "example@mail.com"
- type: String

password:"123456"
- type: String

## Success Response

Code: 200

Content: 

    {
        message: "Successfully logged in",
        data: {
            <user data here>
        }
    }

## Error Response

Code: 400

Content:

    {
        message: User not found
        OR
        message: Password Incorrect
    }

    Ocurrence: when a user enters an invalid email or password

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/blog/signup | POST | sign up into the site

## Data Params
email: "example@mail.com"
- type: String

password:"123456"
- type: String

## Success Response

Code: 201

Content: 

    {
        message: "Successfully signed up",
    }

## Error Response

Code: 400

Content:

    {
        message: Email already taken
    }

    Ocurrence: when a user enters an email that has already been used

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/blog/comment | GET | get all comments

## Data Params
None

## Success Response

Code: 200

Content: 

    {
        message: "Data retrieval success",
        data:
        {
            <comment properties here>
        }
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/blog/comment/add | POST | create a comment

## Data Params
comment: "I love your article"
-   type: String

articleId: "1234567"
-   type: Mongoose ObjectId

## Success Response

Code: 201

Content: 

    {
        message: "Comment successfully added",
        data:
        {
            <comment properties here>
        }
    }

## Error Response

Code: 400

Content: 

    {
        message: "Article does not exist,
        note: 'Please see console log for details'
    }

    Occurence: When user tries to comment invalid article (shouldn;t happen since they can only comment articles that are displayed)

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }

# Route | HTTP | Description
------|------|------------
/blog/comment/delete | POST | delete a comment

## Data Params
commentId: "1234567"
-   type: Mongoose ObjectId

## Success Response

Code: 200

Content: 

    {
        message: "Comment successfully deleted"
    }

## Error Response

Code: 500

Content: 

    {
        message: error.message,
        note: 'Please see console log for details'
    }