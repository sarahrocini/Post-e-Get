const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-destinos");
const modelo = document.querySelector("#modelo-destino");


const apiKey = "cv_ZdfNpypq5LhL1c14zssyLK--ObRlhP1AvEnfRDsoMYmmbu_WcgnQ4BPWZNwGrt1x";

const apiUrl = "https://api-ds.codeverse.dev.br/api/destinos";

async function buscarDestinos() {

  resposta.textContent="Carregando destinos..."
  
  try {
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key" : apiKey},
    });

    if(!retorno.ok){
      throw new Error("Não foi possível carregar os destinos.");
    }

    const resultado = await retorno.json();
    
    for (const destino of resultado.data){
      
      const card = modelo.content.cloneNode(true);


      card.querySelector(".nome").textContent = destino.title;
      card.querySelector(".tipo_destino").textContent = destino.tipo_destino;
      card.querySelector(".melhor_epoca").textContent = destino.melhor_epoca;
      card.querySelector(".custo-medio").textContent = destino.custo_medio;

      const imagem = card.querySelector(".imagem-destino");

      if (destino.imageUrl){
        imagem.src = destino.imageUrl;
        imagem.alt = destino.title;
        
        imagem.onerror = () => imagem.remove();
        
      } else {
        imagem.remove();
      }


      lista.appendChild(card);
      resposta.textContent = "";

    }

  } catch (error) {
    console.error(error);
    resposta.textContent= "Não foi possível carregar os destinos. Tente novamente!";
  }
}


buscarDestinos();