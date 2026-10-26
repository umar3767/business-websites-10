/* Optional progressive photographic previews. SVG originals are always the no-JS fallback. */
(()=>{
 const source=(id,size)=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w='+size+'&q=78';
 const load=img=>{
   const id=img.getAttribute('data-photo');
   if(!/^photo-[a-z0-9-]+$/.test(id||''))return;
   const preview=new Image();
   preview.decoding='async';
   preview.onload=()=>{img.src=preview.src;img.setAttribute('data-photography-ready','');};
   preview.onerror=()=>{/* preserve the authored SVG thumbnail */};
   preview.src=source(id,1000);
 };
 const images=[...document.querySelectorAll('img[data-photo]')];
 if('IntersectionObserver' in window){
   const observer=new IntersectionObserver(entries=>{
      for(const e of entries)if(e.isIntersecting){observer.unobserve(e.target);load(e.target);}
   },{rootMargin:'400px 0px'});
   images.forEach(img=>observer.observe(img));
 }else images.forEach(load);
})();
