
(function(){
  const hours = {"sun":"10:00-17:00","mon":"10:00-17:00","tue":"10:00-17:00","wed":"closed","thu":"10:00-17:00","fri":"10:00-17:00","sat":"10:00-17:00"};
  document.querySelectorAll('[data-open-chip]').forEach(function(el){
    const now = new Date();
    const dayIdx = now.getDay();
    const map = ["sun","mon","tue","wed","thu","fri","sat"];
    const key = map[dayIdx];
    const sched = hours[key];
    function fmt(t){const [h,m]=t.split(':'); const d=new Date(); d.setHours(+h); d.setMinutes(+m||0); d.setSeconds(0); return d;}
    if(!sched || sched==="closed"){ el.textContent="Closed today"; el.classList.add('closed'); return; }
    const [open,close] = sched.split('-');
    const openT = fmt(open), closeT = fmt(close);
    if(now>=openT && now<=closeT){
      const opts = {hour:'numeric',minute:'2-digit'};
      el.textContent = "Open now - closes " + closeT.toLocaleTimeString([], opts);
    } else {
      const opts = {hour:'numeric',minute:'2-digit'};
      el.textContent = "Closed - opens " + openT.toLocaleTimeString([], opts);
      el.classList.add('closed');
    }
  });
  const togglePairs = [];
  function updateBodyClass(){
    const anyOpen = togglePairs.some(function(pair){
      return pair.menu.classList.contains('is-open');
    });
    if(anyOpen){
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }
  document.querySelectorAll('.menu-toggle').forEach(function(btn){
    const menuId = btn.getAttribute('aria-controls');
    if(!menuId){return;}
    const menu = document.getElementById(menuId);
    if(!menu){return;}
    const pair = {btn:btn, menu:menu, setState:setState};
    function setState(open){
      const isOpen = Boolean(open);
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menu.classList.toggle('is-open', isOpen);
      updateBodyClass();
    }
    pair.setState = setState;
    togglePairs.push(pair);
    btn.addEventListener('click', function(){
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      setState(!expanded);
    });
    menu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        setState(false);
      });
    });
  });
  window.addEventListener('resize', function(){
    if(window.innerWidth > 1023){
      togglePairs.forEach(function(pair){
        pair.setState(false);
      });
    }
  });
  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape'){
      togglePairs.forEach(function(pair){
        pair.setState(false);
      });
    }
  });
})();
