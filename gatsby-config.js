module.exports = {
    plugins: [
        {
            resolve : "gatsby-source-test",
            options : {
                message : "Hello World !",
                endpoint: 12345,
                access_token : "",
                instagram_user_id :"",
                instagram_user_name : "stanley_videaste"
            },
        },
    ],
}