<template>
    <div class="container">
        <img alt="Vue logo" src="../assets/logo.png" />
        <div class="top">
            <h3>{{ displayName }}さんようこそ！！</h3>
            <h3>残高：{{ moneyStatus }}</h3>
        </div>
        <div class="main">
            <table>
                <caption>
                    ユーザ一覧
                </caption>
                <colgroup span="1" class="col-1"></colgroup>
                <colgroup span="1" class="col-2"></colgroup>
                <tr>
                    <th>ユーザ名</th>
                    <th></th>
                </tr>
                <tr>
                    <td align="center">テスト</td>
                    <td align="right">
                        <button class="btn">walletを見る</button
                        ><button class="btn">送る</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        this.$store.dispatch('getMoneyStatus');
    },
    computed: {
        displayName() {
            return this.$store.getters.displayName;
        },
        moneyStatus() {
            return this.$store.getters.moneyStatus;
        },
    },
};
</script>
<style scoped>
.container {
    width: 1000px;
    margin: auto;
    padding-top: 50px;
}

.top {
    display: flex;
    justify-content: space-between;
}

.main {
    width: 600px;
    margin: auto;
}
table {
    width: 100%;
}

caption {
    font-size: 80px;
    margin-top: 32px;
}

.btn {
    color: white;
    background-color: rgb(68, 161, 201);
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 5px;
    border-color: white;
    border-style: none;
}

.col-1 {
    width: 15%;
}
</style>
