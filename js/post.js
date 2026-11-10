const form = document.querySelector("#form-destino");

const resposta = document.querySelector("#resposta");


const apiKey = "cv_ZdfNpypq5LhL1c14zssyLK--ObRlhP1AvEnfRDsoMYmmbu_WcgnQ4BPWZNwGrt1x";

const apiUrl = "https://api-ds.codeverse.dev.br/api/destinos";


form.addEventListener("submit", async function (event) {
  
  event.preventDefault();


  const dados =  new FormData(form);


  const destino = {
      title: dados.get("title"),
      tipo: dados.get("tipo_destino"),
      melhor_epoca: dados.get("melhor_epoca"),
      custo_medio: dados.get("custo_medio"),
      imageUrl: dados.get("imageUrl") || null
  }

  resposta.textContent = "Enviando destino para a API....";


try {

  const respostaApi = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },


    body: JSON.stringify(destino),
  });

  const texto = await respostaApi.text();
  let resultado;

  try {
    resultado = texto ? JSON.parse(texto) : {};
  } catch (error) {
    resultado = error;
    return;
  }

  if(respostaApi.ok){
    resposta.textContent = `${resultado.title} foi cadastrado com sucesso.`;
    form.reset();
  }
  
} catch (error) {
  console.error(error);
}

})