
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
})();
