function calcular(area,pav,tipo){if(!(Number.isFinite(area)&&area>0&&Number.isInteger(pav)&&pav>0))return null;if(tipo!=='convencional'||area>1000||pav>10)return {valor:null,regra:'Sob análise técnica, sem preço automático.'};if(pav<=2){if(area<=80)return {valor:2000,regra:'Até 2 pavimentos e até 80 m²: preço fixo.'};if(area<=240)return {valor:Math.max(3000,area*12),regra:'R$ 12/m², com mínimo de R$ 3.000.'};return {valor:area*15,regra:'R$ 15/m² sobre a área total.'};}const taxa=pav<=6?20:({7:25,8:26.67,9:28.33,10:30})[pav];return {valor:Math.round(area*taxa*100)/100,regra:`R$ ${taxa.toFixed(2).replace('.',',')}/m² sobre a área total.`};}
const formatarPreco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const form = document.getElementById('form');
const nome = document.getElementById('nome');
const cidade = document.getElementById('cidade');
const area = document.getElementById('area');
const pavimentos = document.getElementById('pav');
const servico = document.getElementById('tipo');

const quoteValue = document.getElementById('quote-value');
const quoteDetail = document.getElementById('quote-detail');

function atualizarEstimativa() {
  const estimativa = calcular(area.valueAsNumber, pavimentos.valueAsNumber, servico.value);
  quoteValue.textContent = !estimativa ? 'Informe a área e o número de pavimentos.' :
    estimativa.valor === null ? 'Sob consulta' : formatarPreco.format(estimativa.valor);
  quoteDetail.textContent = estimativa?.regra ?? '';
  return estimativa;
}

[area, pavimentos, servico].forEach(campo => campo.addEventListener('input', atualizarEstimativa));
atualizarEstimativa();

form.addEventListener('submit', event => {
  event.preventDefault();
  const estimativa = atualizarEstimativa();
  if (!estimativa) return;
  const valor = estimativa.valor === null ? 'Sob consulta' : formatarPreco.format(estimativa.valor);
  const mensagem = [
    'Olá, Bonno Engenharia e Arquitetura! Gostaria de solicitar um orçamento.',
    '',
    `Nome: ${nome.value.trim()}`,
    `Cidade/UF: ${cidade.value.trim()}`,
    `Área total construída: ${area.value} m²`,
    `Pavimentos: ${pavimentos.value}`,
    `Serviço: ${servico.selectedOptions[0].text}`,
    `Estimativa preliminar: ${valor}`,
  ].join('\n');
  window.open('https://wa.me/5528999340406?text=' + encodeURIComponent(mensagem), '_blank', 'noopener');
});

document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{const choice=button.dataset.gallery;document.querySelectorAll('[data-gallery]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});['arquitetura','estrutura','tecnico'].forEach(kind=>{document.getElementById('res-'+kind).hidden=kind!==choice;});}));

(()=>{const host=document.querySelector('.carousel');const slides=[...host.querySelectorAll('.hero-slide')];const pause=document.getElementById('slide-pause');const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let index=0,paused=reduced.matches,hovered=false,focused=false;function show(n){index=(n+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==index);document.getElementById('slide-count').textContent=String(index+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');}function label(){pause.textContent=paused?'Reproduzir':'Pausar';pause.setAttribute('aria-label',paused?'Reproduzir carrossel':'Pausar carrossel');}label();document.getElementById('slide-prev').addEventListener('click',()=>show(index-1));document.getElementById('slide-next').addEventListener('click',()=>show(index+1));pause.addEventListener('click',()=>{paused=!paused;label();});host.addEventListener('mouseenter',()=>hovered=true);host.addEventListener('mouseleave',()=>hovered=false);host.addEventListener('focusin',()=>focused=true);host.addEventListener('focusout',e=>focused=host.contains(e.relatedTarget));setInterval(()=>{if(!paused&&!hovered&&!focused&&!document.hidden)show(index+1);},6000);})();
