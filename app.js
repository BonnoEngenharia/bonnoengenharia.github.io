const form = document.getElementById('form');
const nome = document.getElementById('nome');
const cidade = document.getElementById('cidade');
const area = document.getElementById('area');
const pavimentos = document.getElementById('pav');
const servico = document.getElementById('tipo');

form.addEventListener('submit', event => {
  event.preventDefault();
  const mensagem = [
    'Olá, Bonno Engenharia e Arquitetura! Gostaria de solicitar um orçamento.',
    '',
    `Nome: ${nome.value.trim()}`,
    `Cidade/UF: ${cidade.value.trim()}`,
    `Área total construída: ${area.value} m²`,
    `Pavimentos: ${pavimentos.value}`,
    `Serviço: ${servico.selectedOptions[0].text}`,
  ].join('\n');
  window.open('https://wa.me/5528999340406?text=' + encodeURIComponent(mensagem), '_blank', 'noopener');
});

document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{const choice=button.dataset.gallery;document.querySelectorAll('[data-gallery]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});['arquitetura','estrutura','tecnico'].forEach(kind=>{document.getElementById('res-'+kind).hidden=kind!==choice;});}));

(()=>{const host=document.querySelector('.carousel');const slides=[...host.querySelectorAll('.hero-slide')];const pause=document.getElementById('slide-pause');const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let index=0,paused=reduced.matches,hovered=false,focused=false;function show(n){index=(n+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==index);document.getElementById('slide-count').textContent=String(index+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');}function label(){pause.textContent=paused?'Reproduzir':'Pausar';pause.setAttribute('aria-label',paused?'Reproduzir carrossel':'Pausar carrossel');}label();document.getElementById('slide-prev').addEventListener('click',()=>show(index-1));document.getElementById('slide-next').addEventListener('click',()=>show(index+1));pause.addEventListener('click',()=>{paused=!paused;label();});host.addEventListener('mouseenter',()=>hovered=true);host.addEventListener('mouseleave',()=>hovered=false);host.addEventListener('focusin',()=>focused=true);host.addEventListener('focusout',e=>focused=host.contains(e.relatedTarget));setInterval(()=>{if(!paused&&!hovered&&!focused&&!document.hidden)show(index+1);},6000);})();
