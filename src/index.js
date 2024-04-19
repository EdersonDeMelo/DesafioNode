const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

async function logRollResult(player, block, diceResult, attribute) {
    console.log(`${player} 🎲 rolou o dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(player1, player2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);


        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = player1.VELOCIDADE + diceResult1;
            totalTestSkill2 = player2.VELOCIDADE + diceResult2;

            await logRollResult(player1.NOME, "velocidade", diceResult1, player1.VELOCIDADE);
            await logRollResult(player2.NOME, "velocidade", diceResult1, player2.VELOCIDADE);
        }
        if (block === "CURVA") {
            totalTestSkill1 = player1.MANOBRABILIDADE + diceResult1;
            totalTestSkill2 = player2.MANOBRABILIDADE + diceResult2;

            await logRollResult(player1.NOME, "manobrabilidade", diceResult1, player1.MANOBRABILIDADE);
            await logRollResult(player2.NOME, "manobrabilidade", diceResult2, player2.MANOBRABILIDADE);
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + player1.PODER;
            let powerResult2 = diceResult2 + player2.PODER;

            totalTestSkill1 = powerResult1;
            totalTestSkill2 = powerResult2;

            console.log(`${player1.NOME} confrontou com ${player2.NOME}! 🥊`);
            await logRollResult(player1.NOME, "poder", diceResult1, player1.PODER);
            await logRollResult(player2.NOME, "poder", diceResult2, player2.PODER);

            if( powerResult1 > powerResult2 && player2.PONTOS > 0){
                console.log(`${player1.NOME} venceu o confronto e ${player2.NOME} perdeu um ponto! 🏅`);
                player2.PONTOS--;
            }
            if( powerResult2 > powerResult1 && player1.PONTOS > 0){
                console.log(`${player2.NOME} venceu o confronto e ${player1.NOME} perdeu um ponto! 🏅`);
                player1.PONTOS--;
            }

            if(powerResult2 === powerResult1) {
                console.log(`Confronto empatado! Nenhum ponto foi perdido`);
            }
        }

        if(totalTestSkill1 > totalTestSkill2) {
            player1.PONTOS++;
            console.log(`${player1.NOME} marcou um ponto!`);
        } else if(totalTestSkill1 < totalTestSkill2) {
            player2.PONTOS++;
            console.log(`${player2.NOME} marcou um ponto!`);
        }

        console.log(`-----------------------------------------`);

    }

}

async function declareWinner(player1, player2) {
    console.log(`🏁🎮 Corrida entre ${player1.NOME} e ${player2.NOME} terminou!\n`);
    console.log(`${player1.NOME}: ${player1.PONTOS} pontos`);
    console.log(`${player2.NOME}: ${player2.PONTOS} pontos`);

    if(player1.PONTOS > player2.PONTOS){
        console.log(`${player1.NOME} venceu a corrida! 🏆`);
    } else if(player2.PONTOS > player1.PONTOS){
        console.log(`${player2.NOME} venceu a corrida! 🏆`);
    } else {
        console.log(`A corrida terminou empatada! 🏁`);
    }
}

(async function main() {
    console.log(`🏁🎮 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();