<template>
    <div>
        <div>
            <img alt="Vue logo" src="../assets/logo.png" />
            <h1>ログイン画面</h1>
        </div>

        <table class="form" align="center">
            <tr>
                <td><label for="email">メールアドレス</label></td>
                <td><input id="email" type="email" vmodel="email" /></td>
            </tr>
            <tr>
                <td><label for="password">パスワード</label></td>
                <td>
                    <input id="password" type="password" vmodel="password" />
                </td>
            </tr>
        </table>

        <div class="block">
            <button class="login-btn">ログイン</button>
            <router-link class="signup-link" to="/"
                >新規登録はこちらから</router-link
            >
        </div>
        <p class="footer">Copyright ©︎ 2019 ⚪︎⚪︎ Inc. All rights reserved</p>
    </div>
</template>
<style scoped>
h1 {
    font-size: 50px;
    font-weight: 200;
}
.form {
    margin-top: 60px;
    font-weight: 600;
}
.block {
    margin-top: 30px;
    margin-bottom: 60px;
}
.login-btn {
    color: rgb(55, 159, 219);
    font-size: 18px;
    border: solid 1px rgb(55, 159, 219);
    padding: 6px 14px;
    background-color: white;
    border-radius: 5px;
    transition: all 0.5s;
}
.login-btn:hover {
    color: white;
    background-color: rgb(55, 159, 219);
}
.signup-link {
    display: block;
    color: rgb(55, 159, 219);
    font-size: 14px;
    text-decoration: none;
}
.footer {
    font-size: 14px;
}
</style>
