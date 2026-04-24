(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=[];function n({categoria:t,valor:n,data:r,descricao:i}){let a={id:Date.now(),categoria:t,valor:Number(n),data:r,descricao:i};return e.push(a),e}function r(t=e){return t.reduce((e,t)=>e+Number(t.valor),0)}function i(t,n){let r=e.findIndex(e=>String(e.id)===String(t));return r===-1?!1:(e[r]={id:t,...n},!0)}function a(t){let n=e.findIndex(e=>e.id===t.id);e.splice(n,1)}function o(e){return e===``?(alert(`Prencha o campo categoria`),!1):!0}function s(e){return e===``?(alert(`Preencha o campo valor`),!1):e<=0?(alert(`O campo valor tem que ser maior que zero`),!1):!0}function c(e){return e===``?(alert(`Preencha o campo data`),!1):!0}function l({categoria:e,valor:t,data:n}){let r=o(e),i=s(t),a=c(n);return!(!r||!i||!a)}var u=null;function d(){return`
  <div
          class="w-full h-[100px] bg-gray-200 rounded-[10px] flex items-center gap-4 p-2 shadow-md"
        >
          <div class="flex flex-col shadow-md rounded-2xl p-4">
            <h2 class="text-sm text-gray-500">Renda Total</h2>
            <label
              id="total-Renda"
              for=""
              class="text-xl text-green-700 font-bold"
            >
              R$ 0,00
            </label>
          </div>
          <button
            id="btn-nova-renda"
            class="w-[140px] h-[40px] bg-[#459464] hover:bg-[#3a7d54] text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d"
          >
            + Nova Renda
          </button>
          <div id="lista-cards-header" class="flex gap-2 overflow-x-auto">

          </div>
        </div>
  
  `}function f(){return`
  <div
          class="w-full h-[50px] text-green-800 bg-white p-2 flex items-center justify-between rounded-[10px] shadow-sm rounded-2xl border-l-4 border-green-800"
        >
          <h1 class="text-xl font-semibold">Painel de Rendas</h1>

          <div class="relative flex items-center gap-2">
            <span
              id="texto-mes-atual"
              class="font-medium text-green-800 text-sm"
              >Mês atual</span
            >

            <button
              id="btn-abrir-calendario"
              class="w-8 h-8 border flex items-center justify-center py-2 rounded hover:bg-green-100 active:scale-95 btn-3d-data"
            >
              <img
                src="/fin-cntrl/assets/calendario.png"
                class="w-7 h-7"
                alt="Filtrar por mês"
              />
            </button>

            <input
              type="month"
              id="input-filtro-mes"
              class="absolute right-0 top-full opacity-0 w-1 h-1 pointer-events-none -z-10"
            />
          </div>

          <input type="month" id="input-filtro-mes" class="hidden" />
        </div>
  
  `}function p(){return`
  <div
          id="container-lista-rendas"
          class="w-full h-[400px] p-2 flex flex-col gap-2 overflow-y-auto bg-white rounded-[10px] shadow-2xl"
        ></div>
  
  `}function m(){return`
  <div
          id="fundo-escuro"
          class="w-full h-full bg-black/50 hidden fixed inset-0 z-50"
        >
         
          <div
            id="formulario-cadastro-renda"
            class="w-full h-full border flex items-center justify-center"
          >
            <form>
          <div class="w-[400px] bg-white p-6 rounded shadow">
            <h2 class="text-2xl font-bold mb-4">Cadastro de Renda</h2>
            <div class="mb-4">
              <label for="inputCategoria" class="block text-gray-700"
                >Tipo de Renda</label
              >
              <select
                id="inputCategoria"
                name=""
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-green-700 focus:outline-none"
              >
                <option disabled selected value="">Selecione uma opção</option>
                <option value="Salário">Salário</option>
                <option value="Freelance">Freelance</option>
                <option value="Investimentos">Investimentos</option>
                <option value="Hora Extra">Hora Extra</option>
                <option value="Comissão">Comissão</option>
                <option value="Aluguel Recebido">Aluguel Recebido</option>
                <option value="Dividendos">Dividendos</option>
                <option value="Presente">Presente</option>
                <option value="Restituição">Restituição</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="inputValor" class="block text-gray-700">Valor</label>
              <input
                type="number"
                id="inputValor"
                name="valor"
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-green-700 focus:outline-none"
                placeholder="Digite o valor"
              />
            </div>
            <div class="mb-4">
              <label for="inputData" class="block text-gray-700"
                >Data de Recebimento</label
              >
              <input
                type="date"
                id="inputData"
                name="data"
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-green-700 focus:outline-none"
              />
            </div>
            <div class="mb-4">
              <label for="inputDescricao" class="block text-gray-700"
                >Descrição</label
              >
              <input
                type="text"
                id="inputDescricao"
                name="descricao"
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-green-700 focus:outline-none"
                placeholder="Digite uma descrição"
              />
            </div>

            <div class="flex justify-between gap-2">
              <button
                type="button"
                id="btn-model-cadastrar"
                class="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700 active:scale-95 btn-3d"
              >
                Cadastrar
              </button>
              <button
                type="button"
                id="btn-model-cancelar"
                class="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 btn-3d-cancelar"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
          </div>
  </div>
  
  `}function h(e){return`
  <div
          class="w-full h-20 bg-gray-200 rounded-[10px] gap-4 p-2 shadow-md flex rounded-md items-center justify-between"
        >
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Categoria:</h2>
            <span
              class="border p-1 rounded-[10px] text-center ${ae(e.categoria)} font-medium "
              >${e.categoria}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Valor:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`}).format(e.valor)}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Data:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${e.data.split(`-`).reverse().join(`/`)}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Descrição:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${e.descricao}</span
            >
          </div>
          <div class="w-[110px] p-1 flex items-center justify-between">
            <button
              id="btn-editar-${e.id}"
              class="w-[50px] h-[30px] bg-blue-500 hover:bg-blue-400 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d-editar"
            >
              <img
                src="/fin-cntrl/assets/botao-editar.png"
                class="w-auto h-auto"
                alt=""
              />
            </button>
            <button
              id="btn-deletar-${e.id}"
              class="w-[50px] h-[30px] bg-red-500 hover:bg-red-400 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d-deletar"
            >
              <img
                src="/fin-cntrl/assets/excluir.png"
                class="w-auto h-auto"
                alt=""
              />
            </button>
          </div>
        </div>
  `}function g(){return`
    <section class="w-full h-full flex flex-col p-2 gap-2">
      ${d()}
      ${f()}
      ${p()}
      ${m()}
    </section>
    `}function _(){document.querySelector(`#fundo-escuro`).classList.remove(`hidden`)}function v(){document.querySelector(`#fundo-escuro`).classList.add(`hidden`),y(),u=null,document.querySelector(`#btn-model-cadastrar`).textContent=`Cadastrar`}function ee(){return{categoria:document.querySelector(`#inputCategoria`).value,valor:document.querySelector(`#inputValor`).value,data:document.querySelector(`#inputData`).value,descricao:document.querySelector(`#inputDescricao`).value}}function y(){document.querySelector(`#inputCategoria`).value=``,document.querySelector(`#inputValor`).value=``,document.querySelector(`#inputData`).value=``,document.querySelector(`#inputDescricao`).value=``}function b(){let e=document.querySelector(`#btn-nova-renda`),t=document.querySelector(`#btn-model-cancelar`),r=document.querySelector(`#btn-model-cadastrar`);e.addEventListener(`click`,()=>{let e=document.querySelector(`#input-filtro-mes`).value;e&&(document.querySelector(`#inputData`).value=`${e}-01`),_()}),t.addEventListener(`click`,()=>{v()}),r.addEventListener(`click`,()=>{let e=ee();l(e)&&(u===null?n(e):(i(u,e),u=null,r.textContent=`Cadastrar`),x(e.data),S(),v())})}function x(e){let[t,n]=e.split(`-`),r=`${t}-${n}`,i=document.querySelector(`#input-filtro-mes`),a=document.querySelector(`#texto-mes-atual`);i&&(i.value=r,a.textContent=`${n}/${t}`)}function te(){let e=document.querySelector(`#btn-abrir-calendario`),t=document.querySelector(`#input-filtro-mes`),n=document.querySelector(`#texto-mes-atual`),r=new Date,i=r.getFullYear(),a=String(r.getMonth()+1).padStart(2,`0`),o=`${i}-${a}`;t&&(t.value=o,n.textContent=`${a}/${i}`),e.addEventListener(`click`,()=>t.showPicker()),t.addEventListener(`change`,e=>{let t=e.target.value;if(t){let[e,r]=t.split(`-`);n.textContent=`${r}/${e}`}else n.textContent=`Selecione um mês`;S()})}function ne(){let t=document.querySelector(`#container-lista-rendas`),n=document.querySelector(`#input-filtro-mes`).value,i=e.filter(e=>n?e.data.startsWith(n):!0);t.innerHTML=i.map(e=>h(e)).join(``);let a=document.querySelector(`#total-Renda`),o=r(i);a.textContent=new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`}).format(o)}function re(){let t=document.querySelector(`#btn-model-cadastrar`);e.forEach(e=>{let n=document.querySelector(`#btn-editar-${e.id}`);n&&n.addEventListener(`click`,()=>{u=e.id,document.querySelector(`#inputCategoria`).value=e.categoria,document.querySelector(`#inputValor`).value=e.valor,document.querySelector(`#inputData`).value=e.data,document.querySelector(`#inputDescricao`).value=e.descricao,t.textContent=`Concluir Edição`,_()})})}function ie(){e.forEach(e=>{let t=document.querySelector(`#btn-deletar-${e.id}`);t&&t.addEventListener(`click`,()=>{a(e),S()})})}function ae(e){switch(e){case`Salário`:return`bg-blue-200 text-blue-800`;case`Freelance`:return`bg-purple-200 text-purple-800`;case`Investimentos`:return`bg-yellow-200 text-yellow-800`;case`Hora Extra`:return`bg-orange-200 text-orange-800`;case`Comissão`:return`bg-pink-200 text-pink-800`;case`Aluguel Recebido`:return`bg-teal-200 text-teal-800`;case`Dividendos`:return`bg-green-200 text-green-800`;case`Presente`:return`bg-red-200 text-red-800`;case`Restituição`:return`bg-indigo-200 text-indigo-800`;case`Outros`:return`bg-gray-200 text-gray-800`;default:}}function S(){ne(),re(),ie()}function oe(){b(),S(),te()}function C({categoria:e,valor:n,data:r,descricao:i}){let a={id:Date.now(),categoria:e,valor:Number(n),data:r,descricao:i};return t.push(a),t}function w(e=t){return e.reduce((e,t)=>e+Number(t.valor),0)}function T(e,n){let r=t.findIndex(t=>String(t.id)===String(e));return r===-1?!1:(t[r]={id:e,...n},!0)}function E(e){let n=t.findIndex(t=>t.id===e.id);t.splice(n,1)}function D(e){return e===``?(alert(`Preencha o campo categoria`),!1):!0}function O(e){return e===``?(alert(`Preencha o campo valor`),!1):e<=0?(alert(`O campo valor tem que ser maior que zero`),!1):!0}function k(e){return e===``?(alert(`Preencha o campo data`),!1):!0}function A({categoria:e,valor:t,data:n}){let r=D(e),i=O(t),a=k(n);return!(!r||!i||!a)}var j=null;function M(){return`
  <div
          class="w-full h-[100px] bg-gray-200 rounded-[10px] flex items-center gap-4 p-2 shadow-md"
        >
          <div class="flex flex-col shadow-md rounded-2xl p-4">
            <h2 class="text-sm text-gray-500">Gastos Totais</h2>
            <label
              id="total-Gasto"
              for=""
              class="text-xl text-[#9F0712] font-bold"
            >
              R$ 0,00
            </label>
          </div>
          <button
            id="btn-nova-gastos"
            class="w-[140px] h-[40px] bg-[#9F0712] hover:bg-red-700 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-gasto-3d"
          >
            + Novo Gasto
          </button>
        </div>
  
  `}function N(){return`
  <div
          class="w-full h-[50px] text-[#9F0712] bg-white p-2 flex items-center justify-between rounded-[10px] shadow-sm rounded-2xl border-l-4 border-[#9F0712]"
        >
          <h1 class="text-xl font-semibold">Painel de Gastos</h1>

          <div class="relative flex items-center gap-2">
            <span
              id="texto-mes-atual"
              class="font-medium text-[#9F0712] text-sm"
              >Mês atual</span
            >

            <button
              id="btn-abrir-calendario"
              class="w-8 h-8 border flex items-center justify-center py-2 rounded hover:bg-green-100 active:scale-95 btn-3d-data-gasto"
            >
              <img
                src="/fin-cntrl/assets/calendarioGastos.png"
                class="w-7 h-7"
                alt="Filtrar por mês"
              />
            </button>

            <input
              type="month"
              id="input-filtro-mes"
              class="absolute right-0 top-full opacity-0 w-1 h-1 pointer-events-none -z-10"
            />
          </div>

          <input type="month" id="input-filtro-mes" class="hidden" />
        </div>
  
  `}function P(){return`
  <div
          id="container-lista-gastos"
          class="w-full h-[400px] p-2 flex flex-col gap-2 overflow-y-auto bg-white rounded-[10px] shadow-2xl"
        ></div>
  
  `}function F(){return`
  <div
          id="fundo-escuro"
          class="w-full h-full bg-black/50 hidden fixed inset-0 z-50"
        >
         
          <div
            id="formulario-cadastro-gastos"
            class="w-full h-full border flex items-center justify-center"
          >
            <form>
          <div class="w-[400px] bg-white p-6 rounded shadow">
            <h2 class="text-2xl font-bold mb-4">Cadastro de gastos</h2>
            <div class="mb-4">
              <label for="inputCategoria" class="block text-gray-700"
                >Tipo de Gasto</label
              >
              <select
                id="inputCategoria"
                name=""
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-[#9F0712] focus:outline-none"
              >
                <option disabled selected value="">Selecione uma opção</option>
                <option value="Aluguel / Prestação">Aluguel / Prestação</option>
                <option value="Conta de Luz">Conta de Luz</option>
                <option value="Conta de Água">Conta de Água</option>
                <option value="Internet">Internet</option>
                <option value="Conta de Telefone">Conta de Telefone</option>
                <option value="Supermercado">Supermercado</option>
                <option value="Restaurante / Delivery">Restaurante / Delivery</option>
                <option value="Combustível">Combustível</option>
                <option value="Aplicativos (Uber/99)">Aplicativos (Uber/99)</option>
                <option value="Assinaturas (Netflix, Spotify, etc.)">Assinaturas (Netflix, Spotify, etc.)</option>
                <option value="Lazer / Saídas">Lazer / Saídas</option>
                <option value="Faculdade / Cursos">Faculdade / Cursos</option>
                <option value="Fatura do Cartão de Crédito">Fatura do Cartão de Crédito</option>
                <option value="Imprevistos">Imprevistos</option>
                <option value="Pagamentos de Terceiros">Pagamentos de Terceiros</option>
                <option value="Outros Gastos">Outros Gastos</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="inputValor" class="block text-gray-700">Valor</label>
              <input
                type="number"
                id="inputValor"
                name="valor"
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-[#9F0712] focus:outline-none"
                placeholder="Digite o valor"
              />
            </div>
            <div class="mb-4">
              <label for="inputData" class="block text-gray-700"
                >Data de Recebimento</label
              >
              <input
                type="date"
                id="inputData"
                name="data"
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-[#9F0712] focus:outline-none"
              />
            </div>
            <div class="mb-4">
              <label for="inputDescricao" class="block text-gray-700"
                >Descrição</label
              >
              <input
                type="text"
                id="inputDescricao"
                name="descricao"
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-[#9F0712] focus:outline-none"
                placeholder="Digite uma descrição"
              />
            </div>

            <div class="flex justify-between gap-2">
              <button
                type="button"
                id="btn-model-cadastrar"
                class="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700 active:scale-95 btn-3d"
              >
                Cadastrar
              </button>
              <button
                type="button"
                id="btn-model-cancelar"
                class="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 btn-3d-cancelar"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
          </div>
  </div>
  
  `}function I(e){return`
  <div
          class="w-full h-20 bg-gray-200 rounded-[10px] gap-4 p-2 shadow-md flex rounded-md items-center justify-between"
        >
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Categoria:</h2>
            <span
              class="border p-1 rounded-[10px] text-center ${L(e.categoria)} font-medium "
              >${e.categoria}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Valor:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-red-600 font-bold"
              >${new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`}).format(e.valor)}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Data:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${e.data.split(`-`).reverse().join(`/`)}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Descrição:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${e.descricao}</span
            >
          </div>
          <div class="w-[110px] p-1 flex items-center justify-between">
            <button
              id="btn-editar-gasto-${e.id}" 
              class="w-[50px] h-[30px] bg-blue-500 hover:bg-blue-400 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d-editar"
            >
              <img
                src="/fin-cntrl/assets/botao-editar.png"
                class="w-auto h-auto"
                alt=""
              />
            </button>
            <button
              id="btn-deletar-gasto-${e.id}"
              class="w-[50px] h-[30px] bg-red-500 hover:bg-red-400 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d-deletar"
            >
              <img
                src="/fin-cntrl/assets/excluir.png"
                class="w-auto h-auto"
                alt=""
              />
            </button>
          </div>
        </div>
  `}function L(e){switch(e){case`Aluguel / Prestação`:return`bg-slate-200 text-slate-800`;case`Conta de Luz`:return`bg-yellow-200 text-yellow-800`;case`Conta de Água`:return`bg-cyan-200 text-cyan-800`;case`Internet`:return`bg-sky-200 text-sky-800`;case`Conta de Telefone`:return`bg-blue-200 text-blue-800`;case`Supermercado`:return`bg-emerald-200 text-emerald-800`;case`Restaurante / Delivery`:return`bg-orange-200 text-orange-800`;case`Combustível`:return`bg-red-200 text-red-800`;case`Aplicativos (Uber/99)`:return`bg-stone-200 text-stone-800`;case`Assinaturas (Netflix, Spotify, etc.)`:return`bg-purple-200 text-purple-800`;case`Lazer / Saídas`:return`bg-fuchsia-200 text-fuchsia-800`;case`Faculdade / Cursos`:return`bg-indigo-200 text-indigo-800`;case`Fatura do Cartão de Crédito`:return`bg-rose-200 text-rose-800`;case`Imprevistos`:return`bg-amber-200 text-amber-800`;case`Outros Gastos`:return`bg-gray-200 text-gray-800`;default:return`bg-gray-200 text-gray-400`}}function R(){return`
    <section class="w-full h-full flex flex-col p-2 gap-2">
    ${M()}
    ${N()}
    ${P()}
    ${F()}
    </section>
    `}function z(){document.querySelector(`#fundo-escuro`).classList.remove(`hidden`)}function B(){document.querySelector(`#fundo-escuro`).classList.add(`hidden`),H(),j=null,document.querySelector(`#btn-model-cadastrar`).textContent=`Cadastrar`}function V(){return{categoria:document.querySelector(`#inputCategoria`).value,valor:document.querySelector(`#inputValor`).value,data:document.querySelector(`#inputData`).value,descricao:document.querySelector(`#inputDescricao`).value}}function H(){document.querySelector(`#inputCategoria`).value=``,document.querySelector(`#inputValor`).value=``,document.querySelector(`#inputData`).value=``,document.querySelector(`#inputDescricao`).value=``}function U(){let e=document.querySelector(`#btn-nova-gastos`),t=document.querySelector(`#btn-model-cancelar`),n=document.querySelector(`#btn-model-cadastrar`);e.addEventListener(`click`,()=>{let e=document.querySelector(`#input-filtro-mes`).value;e&&(document.querySelector(`#inputData`).value=`${e}-01`),z()}),t.addEventListener(`click`,()=>{B()}),n.addEventListener(`click`,()=>{let e=V();A(e)&&(j===null?C(e):(T(j,e),j=null,n.textContent=`Cadastrar`),W(e.data),q(),B())})}function W(e){let[t,n]=e.split(`-`),r=`${t}-${n}`,i=document.querySelector(`#input-filtro-mes`),a=document.querySelector(`#texto-mes-atual`);i&&(i.value=r,a.textContent=`${n}/${t}`)}function G(){let e=document.querySelector(`#btn-abrir-calendario`),t=document.querySelector(`#input-filtro-mes`),n=document.querySelector(`#texto-mes-atual`),r=new Date,i=r.getFullYear(),a=String(r.getMonth()+1).padStart(2,`0`),o=`${i}-${a}`;t&&(t.value=o,n.textContent=`${a}/${i}`),e.addEventListener(`click`,()=>t.showPicker()),t.addEventListener(`change`,e=>{let t=e.target.value;if(t){let[e,r]=t.split(`-`);n.textContent=`${r}/${e}`}else n.textContent=`Selecione um mês`;q()})}function K(){let e=document.querySelector(`#container-lista-gastos`),n=document.querySelector(`#input-filtro-mes`).value,r=t.filter(e=>n?e.data.startsWith(n):!0);e.innerHTML=r.map(e=>I(e)).join(``);let i=document.querySelector(`#total-Gasto`),a=w(r);i.textContent=new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`}).format(a)}function se(){let e=document.querySelector(`#btn-model-cadastrar`);t.forEach(t=>{let n=document.querySelector(`#btn-editar-gasto-${t.id}`);n&&n.addEventListener(`click`,()=>{j=t.id,document.querySelector(`#inputCategoria`).value=t.categoria,document.querySelector(`#inputValor`).value=t.valor,document.querySelector(`#inputData`).value=t.data,document.querySelector(`#inputDescricao`).value=t.descricao,e.textContent=`Concluir Edição`,z()})})}function ce(){t.forEach(e=>{let t=document.querySelector(`#btn-deletar-gasto-${e.id}`);t&&t.addEventListener(`click`,()=>{E(e),q()})})}function q(){K(),se(),ce()}function le(){U(),q(),G()}function ue(){return`
    <div class="w-full p-3">
          <div
            class="w-full h-auto text-green-800 bg-white px-5 py-3 flex items-center justify-between rounded-[10px] shadow-sm rounded-2xl border-l-4 border-green-800"
          >
            <h1 class="text-xl font-semibold">Dashboard</h1>

            <div class="relative flex items-center gap-2">
              <span
                id="texto-mes-atual"
                class="font-medium text-green-800 text-sm"
                >Mês atual</span
              >

              <button
                id="btn-abrir-calendario"
                class="w-8 h-8 border flex items-center justify-center py-2 rounded hover:bg-green-100 active:scale-95 btn-3d-data"
              >
                <img
                  src="/fin-cntrl/assets/calendario.png"
                  class="w-7 h-7"
                  alt="Filtrar por mês"
                />
              </button>

              <input
                type="month"
                id="input-filtro-mes"
                class="absolute right-0 top-full opacity-0 w-1 h-1 pointer-events-none -z-10"
              />
            </div>

            <input type="month" class="hidden" />
          </div>
        </div>
    `}function de(){return`
          <div
              class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
              >
                <h4 class="text-gray-500 font-medium">Fonte de Renda</h4>
                <h1 id="valor-renda-card" class="text-3xl font-bold text-green-600">0,00</h1>
                <p class="text-sm text-gray-400">Total recebido <span class="data-dinamica-card">---</span></p>
              </div>
          </div>
  
  `}function J(t){if(!t)return;let n=e.filter(e=>e.data?.startsWith(t)).reduce((e,t)=>e+(Number(t.valor)||0),0),r=document.getElementById(`valor-renda-card`);r&&(r.innerText=n.toLocaleString(`pt-BR`,{minimumFractionDigits:2}));let[i,a]=t.split(`-`),o=`${[`Janeiro`,`Fevereiro`,`Março`,`Abril`,`Maio`,`Junho`,`Julho`,`Agosto`,`Setembro`,`Outubro`,`Novembro`,`Dezembro`][parseInt(a)-1]} / ${i}`;document.querySelectorAll(`.data-dinamica-card`).forEach(e=>{e.innerText=o})}function fe(){return`
          <div
              class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
              >
                <h4 class="text-gray-500 font-medium">Fonte de Gastos</h4>
                <h1 id="valor-gasto-card" class="text-3xl font-bold text-red-600">0,00</h1>
                <p class="text-sm text-gray-400">Total gastos <span class="data-dinamica-card">---</span></p>
              </div>
          </div>
  
  `}function pe(e){if(!e)return;let n=t.filter(t=>t.data?.startsWith(e)).reduce((e,t)=>e+(Number(t.valor)||0),0),r=document.getElementById(`valor-gasto-card`);r&&(r.innerText=n.toLocaleString(`pt-BR`,{minimumFractionDigits:2}));let[i,a]=e.split(`-`),o=`${[`Janeiro`,`Fevereiro`,`Março`,`Abril`,`Maio`,`Junho`,`Julho`,`Agosto`,`Setembro`,`Outubro`,`Novembro`,`Dezembro`][parseInt(a)-1]} / ${i}`;document.querySelectorAll(`.data-dinamica-card`).forEach(e=>{e.innerText=o})}function me(){return`
        <div
              class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
              >
                <h4 class="text-gray-500 font-medium">Saldo Disponível</h4>
                <h1 id="valor-saldo-card" class="text-3xl font-bold text-green-600">0,00</h1>
                <p class="text-sm text-gray-400">Disponível em <span class="data-dinamica-card">---</span></p>
              </div>
        </div>
`}function he(n){if(!n)return;let r=e.filter(e=>e.data?.startsWith(n)).reduce((e,t)=>e+(Number(t.valor)||0),0)-t.filter(e=>e.data?.startsWith(n)).reduce((e,t)=>e+(Number(t.valor)||0),0),i=document.getElementById(`valor-saldo-card`);i&&(i.innerText=r.toLocaleString(`pt-BR`,{minimumFractionDigits:2}),r<0?i.classList.replace(`text-green-600`,`text-red-600`):i.classList.replace(`text-red-600`,`text-green-600`));let[a,o]=n.split(`-`),s=`${[`Janeiro`,`Fevereiro`,`Março`,`Abril`,`Maio`,`Junho`,`Julho`,`Agosto`,`Setembro`,`Outubro`,`Novembro`,`Dezembro`][parseInt(o)-1]} / ${a}`;document.querySelectorAll(`.data-dinamica-card`).forEach(e=>{e.innerText=s})}function ge(){return`
        <div
            class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
            >
              <h4 class="text-gray-500 font-medium">Cofrinho</h4>
              <h1 class="text-3xl font-bold text-green-600">3.600,00</h1>
              <p class="text-sm text-gray-400">Total acumulado</p>
            </div>
        </div>
  
  `}function _e(){return`
    <div class="w-full h-auto p-3 flex justify-between gap-4">      
    ${de()}
    ${fe()}      
    ${me()}
    ${ge()}      
    </div>
    `}function ve(){return`
    <div class="w-full p-3 h-auto grid grid-cols-3 gap-4">
          <div
            class="h-[400px] col-span-2 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4"
          >
            <h3 class="text-gray-500 font-medium mb-2">Graficos de Gastos</h3>
            <div
              class="w-full h-[330px] border border-gray-300 rounded-2xl bg-white/50 p-2"
            >
              <canvas id="meuGraficoGastos"></canvas>
            </div>
          </div>

          <div class="col-span-1 flex flex-col gap-4 h-[400px]">
            <div class="grid grid-cols-2 gap-4">
              <div
                class="bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-md border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col"
              >
                <h3 class="text-gray-500 font-medium mb-2 text-sm">
                  Renda vs. Gastos
                </h3>
                <div
                  class="relative flex justify-center items-center w-[110px] h-[110px] mt-2 mb-1 mx-auto"
                >
                  <canvas id="graficoProporcao"></canvas>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-md border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col overflow-hidden"
              >
                <h3
                  class="text-gray-500 font-medium text-sm w-full text-left mb-2"
                >
                  Top 3 Despesas
                </h3>
                <div
                  id="lista-top-despesas"
                  class="flex flex-col gap-2 mt-1"
                ></div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-md border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex-1 flex flex-col"
            >
              <h3 class="text-gray-500 font-medium mb-2">Evolução (4 meses)</h3>

              <div class="relative w-full flex-1 min-h-0">
                <div class="absolute inset-0">
                  <canvas id="graficoEvolucao"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
    `}var Y=null;function ye(e){if(!e)return;let n=t.filter(t=>t.data?.startsWith(e)),r={};n.forEach(e=>{let t=e.categoria||`Outros`;r[t]?r[t]+=Number(e.valor):r[t]=Number(e.valor)});let i=Object.keys(r),a=Object.values(r),o=document.getElementById(`meuGraficoGastos`);o&&(Y&&Y.destroy(),Y=new Chart(o,{type:`bar`,data:{labels:i,datasets:[{label:`Total Gasto (R$)`,data:a,backgroundColor:[`#EF4444`,`#F59E0B`,`#10B981`,`#3B82F6`,`#8B5CF6`,`#EC4899`],borderWidth:0,borderRadius:5}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{label:function(e){return` `+e.formattedValue+` Gasto`}}}},scales:{y:{beginAtZero:!0,title:{display:!0,text:`Total Gasto (R$)`,font:{size:14,weight:`bold`}},ticks:{callback:function(e,t,n){return`R$ `+e.toLocaleString(`pt-BR`)}}},x:{title:{display:!0,text:`Categorias de Gastos`,font:{size:14,weight:`bold`}},grid:{display:!1}}}}}))}var X=null;function be(n){if(!n)return;let r=e.filter(e=>e.data?.startsWith(n)).reduce((e,t)=>e+(Number(t.valor)||0),0),i=t.filter(e=>e.data?.startsWith(n)).reduce((e,t)=>e+(Number(t.valor)||0),0),a=r-i;a<0&&(a=0);let o=document.getElementById(`graficoProporcao`);if(!o)return;X&&X.destroy();let s=[`Gastos`,`Disponível`],c=[i,a],l=[`#EF4444`,`#10B981`];r===0&&i===0&&(s=[`Sem movimentação`],c=[1],l=[`#D1D5DB`]),X=new Chart(o,{type:`doughnut`,data:{labels:s,datasets:[{data:c,backgroundColor:l,borderWidth:0,cutout:`75%`}]},options:{responsive:!0,maintainAspectRatio:!1,layout:{padding:0},plugins:{legend:{display:!1},tooltip:{displayColors:!1,bodyFont:{size:11},padding:8,callbacks:{title:function(){return null},label:function(e){return e.label===`Sem movimentação`?`Sem dados`:`${e.label}: R$ ${e.raw.toLocaleString(`pt-BR`,{minimumFractionDigits:2})}`}}}}}})}var Z=null;function xe(e){if(!e)return;let[n,r]=e.split(`-`),i=[],a=[],o=[`Jan`,`Fev`,`Mar`,`Abr`,`Mai`,`Jun`,`Jul`,`Ago`,`Set`,`Out`,`Nov`,`Dez`];for(let e=3;e>=0;e--){let t=new Date(n,r-1-e,1),s=t.getFullYear(),c=String(t.getMonth()+1).padStart(2,`0`);a.push(`${s}-${c}`),i.push(o[t.getMonth()])}let s=a.map(e=>t.filter(t=>t.data?.startsWith(e)).reduce((e,t)=>e+(Number(t.valor)||0),0)),c=document.getElementById(`graficoEvolucao`);c&&(Z&&Z.destroy(),Z=new Chart(c,{type:`line`,data:{labels:i,datasets:[{data:s,borderColor:`#EF4444`,backgroundColor:`rgba(239, 68, 68, 0.1)`,borderWidth:2,fill:!0,tension:.4,pointRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{displayColors:!1,callbacks:{label:function(e){return`Gastos: R$ ${e.raw.toLocaleString(`pt-BR`,{minimumFractionDigits:2})}`}}}},scales:{x:{grid:{display:!1}},y:{display:!1,beginAtZero:!0}}}}))}function Se(e){if(!e)return;let n=document.getElementById(`lista-top-despesas`);if(!n)return;let r=t.filter(t=>t.data?.startsWith(e)).sort((e,t)=>Number(t.valor)-Number(e.valor)).slice(0,3);if(n.innerHTML=``,r.length===0){n.innerHTML=`<p class="text-sm text-gray-400 text-center mt-4">Nenhum gasto neste mês.</p>`;return}r.forEach((e,t)=>{let r=t===0,i=r?`text-red-600 font-bold text-sm`:`text-red-500 font-medium text-sm`,a=`
      <div class="flex flex-col border-b border-gray-200 pb-1 mb-1 last:border-0 last:mb-0 last:pb-0">
        
        <div class="flex items-center  text-gray-600 text-xs ">
          <span class="text-sm">${r?`🥇`:t===1?`🥈`:`🥉`}</span>
          <span class="truncate">${e.categoria||`Outros`}</span>
        </div>
        
        <div class="${i} pl-5">
          R$ ${Number(e.valor).toLocaleString(`pt-BR`,{minimumFractionDigits:2})}
        </div>
        
      </div>
    `;n.innerHTML+=a})}function Ce(n){if(!n)return;let r=document.getElementById(`lista-gestao-rendas`);if(!r)return;let i=e.filter(e=>e.data?.startsWith(n)),a=t.filter(e=>e.data?.startsWith(n));if(r.innerHTML=``,i.length===0){r.innerHTML=`<div class="py-4 text-center text-gray-500 text-sm italic">Nenhuma renda cadastrada neste mês.</div>`;return}i.sort((e,t)=>e.data.localeCompare(t.data));let o=[`bg-purple-200 text-purple-700`,`bg-emerald-200 text-emerald-800`,`bg-blue-200 text-blue-800`,`bg-yellow-200 text-yellow-800`,`bg-pink-200 text-pink-800`],s=new Set;i.forEach((e,t)=>{let n=a.filter(t=>t.data===e.data);n.forEach(e=>s.add(e));let i=n.reduce((e,t)=>e+(Number(t.valor)||0),0),c=Number(e.valor)-i,l=c>=0?`text-emerald-600`:`text-red-600`,[u,d,f]=e.data.split(`-`),p=e.descricao||`Renda`,m=p.charAt(0).toUpperCase(),h=o[t%o.length],g=n.map(e=>e.categoria||e.descricao).join(`, `);g||=`<span class="italic text-gray-400">Nenhum gasto neste dia.</span>`;let _=`
      <div class="grid grid-cols-12 items-center py-3 border-b border-gray-200/80 last:border-0 hover:bg-white/40 transition-colors rounded-lg px-2 -mx-2">
        
        <div class="col-span-4 flex items-center gap-3">
          <div class="${h} w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            ${m}
          </div>
          <div class="flex flex-col overflow-hidden">
            <span class="font-semibold text-gray-700 truncate">${p}</span>
            <span class="text-[10px] text-gray-400 font-medium">Dia ${f}/${d}</span>
          </div>
        </div>

        <div class="col-span-6 text-sm text-gray-500 truncate pr-4">
          ${g}
        </div>

        <div class="col-span-2 text-right flex flex-col items-end">
          <span class="font-bold ${l} whitespace-nowrap">
            R$ ${c.toLocaleString(`pt-BR`,{minimumFractionDigits:2})}
          </span>
        </div>

      </div>
    `;r.innerHTML+=_});let c=a.filter(e=>!s.has(e));if(c.length>0){let e=c.reduce((e,t)=>e+(Number(t.valor)||0),0),t=`
      <div class="grid grid-cols-12 items-center py-3 border-b border-red-200 bg-red-50/50 mt-2 rounded-lg px-2 -mx-2">
        <div class="col-span-4 flex items-center gap-3">
          <div class="bg-red-200 text-red-800 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            ⚠️
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-red-700 truncate">Outros Dias</span>
            <span class="text-[10px] text-red-400 font-medium">Sem renda vinculada</span>
          </div>
        </div>
        <div class="col-span-6 text-sm text-red-500/80 truncate pr-4">
          ${c.map(e=>e.categoria||e.descricao).join(`, `)}
        </div>
        <div class="col-span-2 text-right flex flex-col items-end">
          <span class="font-bold text-red-600 whitespace-nowrap">
            - R$ ${e.toLocaleString(`pt-BR`,{minimumFractionDigits:2})}
          </span>
        </div>
      </div>
    `;r.innerHTML+=t}}function we(){return`
    <div class="w-full h-auto p-3">
      <div class="col-span-3 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md p-5">
        
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-gray-600 font-bold text-lg">Gestão de Salários (Potinhos)</h3>
          <button class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-300 pb-2 mb-2 px-2">
          <div class="col-span-4">Renda / Pote</div>
          <div class="col-span-6">Despesas Pagas (Mesmo Dia)</div>
          <div class="col-span-2 text-right">Saldo Restante</div>
        </div>

        <div id="lista-gestao-rendas" class="flex flex-col">
        </div>

      </div>
    </div>
  `}function Q(){return`
    ${ue()}
    ${_e()}
    ${ve()}
    ${we()}
    `}function Te(){let e=document.getElementById(`input-filtro-mes`),t=document.getElementById(`btn-abrir-calendario`),n=document.getElementById(`texto-mes-atual`);!e||!t||(t.onclick=()=>e.showPicker(),e.onchange=e=>{let t=e.target.value,[r,i]=t.split(`-`);n&&(n.innerText=`${i}/${r}`),J(t),pe(t),he(t),ye(t),be(t),xe(t),Se(t),Ce(t)},e.value&&J(e.value))}function Ee(){Te()}var De=document.querySelectorAll(`#lista-navegacao button`),$=document.querySelector(`#container-conteudo-filho-2`);De.forEach(e=>{e.addEventListener(`click`,()=>{switch(e.id){case`btn-renda`:$.innerHTML=g(),oe();break;case`btn-gastos`:$.innerHTML=R(),le();break;case`btn-dashboard`:$.innerHTML=Q(),Ee();break;default:}})});