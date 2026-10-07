(() => {
  function mount(id){
    const canvas=document.getElementById(id);
    if(!canvas || !window.THREE) return;
    const THREE=window.THREE;
    const host=canvas.parentElement;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(36,1,.1,100);
    camera.position.set(0,.15,7.2);
    const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.setClearColor(0x000000,0);

    const root=new THREE.Group(); scene.add(root);
    const red=new THREE.Color(0xff1738), blood=new THREE.Color(0x8e071c), white=new THREE.Color(0xf4f4f1), dark=new THREE.Color(0x08090b);

    // --- Central MALWARE entity: a procedural 3D bio-mechanical organism ---
    const malware=new THREE.Group(); root.add(malware);
    const shell=new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25,3),
      new THREE.MeshStandardMaterial({color:0x090a0c,roughness:.35,metalness:.8,wireframe:false,transparent:true,opacity:.96})
    );
    malware.add(shell);
    const shellWire=new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.30,2),
      new THREE.MeshBasicMaterial({color:red,wireframe:true,transparent:true,opacity:.42})
    ); malware.add(shellWire);

    const core=new THREE.Mesh(
      new THREE.IcosahedronGeometry(.54,2),
      new THREE.MeshBasicMaterial({color:blood,wireframe:true,transparent:true,opacity:.95})
    ); malware.add(core);
    const coreGlow=new THREE.Mesh(
      new THREE.SphereGeometry(.34,24,24),
      new THREE.MeshBasicMaterial({color:red,transparent:true,opacity:.16})
    ); malware.add(coreGlow);

    // Organic spikes / infection tendrils around the entity.
    const tendrils=[];
    for(let i=0;i<18;i++){
      const a=i/18*Math.PI*2;
      const y=(Math.random()-.5)*1.5;
      const len=.7+Math.random()*1.15;
      const g=new THREE.CylinderGeometry(.025,.075,len,7,1);
      const m=new THREE.MeshBasicMaterial({color:i%3===0?red:blood,transparent:true,opacity:.8});
      const t=new THREE.Mesh(g,m);
      t.position.set(Math.cos(a)*1.05,y,Math.sin(a)*1.05);
      t.rotation.z=Math.PI/2 + (Math.random()-.5)*.7;
      t.rotation.y=-a;
      t.scale.z=.65+Math.random()*.8;
      malware.add(t); tendrils.push(t);
    }

    // Metallic containment cage around the threat.
    const cage=new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.72,2),
      new THREE.MeshBasicMaterial({color:white,wireframe:true,transparent:true,opacity:.11})
    ); root.add(cage);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.72,.014,8,180),new THREE.MeshBasicMaterial({color:red,transparent:true,opacity:.8}));
    ring.rotation.x=Math.PI*.58; root.add(ring);
    const ring2=ring.clone(); ring2.rotation.x=Math.PI*.17; ring2.rotation.y=.55; ring2.material=ring.material.clone(); ring2.material.opacity=.3; root.add(ring2);

    // Network infection branches.
    const network=new THREE.Group(); root.add(network);
    const nodePositions=[];
    for(let i=0;i<28;i++){
      const a=Math.random()*Math.PI*2, r=2.1+Math.random()*1.45;
      const p=new THREE.Vector3(Math.cos(a)*r,(Math.random()-.5)*2.9,Math.sin(a)*r);
      nodePositions.push(p);
      const node=new THREE.Mesh(new THREE.SphereGeometry(.035+Math.random()*.025,10,10),new THREE.MeshBasicMaterial({color:i%5===0?red:white,transparent:true,opacity:.75}));
      node.position.copy(p); network.add(node);
    }
    for(let i=0;i<nodePositions.length;i+=2){
      const a=nodePositions[i], b=nodePositions[(i+3)%nodePositions.length];
      const g=new THREE.BufferGeometry().setFromPoints([a,b]);
      network.add(new THREE.Line(g,new THREE.LineBasicMaterial({color:i%4===0?red:0x4d5158,transparent:true,opacity:i%4===0?.24:.08})));
    }

    // Threat particles + red "blood/infection" droplets.
    const pts=new THREE.BufferGeometry(), count=1100, arr=new Float32Array(count*3);
    for(let i=0;i<count;i++){
      const r=2.0+Math.random()*2.1,a=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1);
      arr[i*3]=r*Math.sin(b)*Math.cos(a); arr[i*3+1]=r*Math.cos(b); arr[i*3+2]=r*Math.sin(b)*Math.sin(a);
    }
    pts.setAttribute('position',new THREE.BufferAttribute(arr,3));
    const particles=new THREE.Points(pts,new THREE.PointsMaterial({color:red,size:.016,transparent:true,opacity:.58})); scene.add(particles);

    const drops=new THREE.Group(); root.add(drops);
    for(let i=0;i<34;i++){
      const drop=new THREE.Mesh(new THREE.SphereGeometry(.018+Math.random()*.045,8,8),new THREE.MeshBasicMaterial({color:i%3?blood:red,transparent:true,opacity:.72}));
      const a=Math.random()*Math.PI*2, r=1.3+Math.random()*2.2;
      drop.position.set(Math.cos(a)*r,(Math.random()-.45)*2.7,Math.sin(a)*r);
      drop.scale.y=1.8+Math.random()*4;
      drops.add(drop);
    }

    // Horizontal SOC scan lines.
    const lines=[];
    for(let i=0;i<11;i++){
      const g=new THREE.BufferGeometry(); const y=(i-5)*.42;
      g.setAttribute('position',new THREE.Float32BufferAttribute([-3,y,-2.1,3,y,2.1],3));
      const l=new THREE.Line(g,new THREE.LineBasicMaterial({color:i%3===0?red:0x666b73,transparent:true,opacity:i%3===0?.2:.055}));
      l.rotation.z=.16; l.rotation.y=i*.045; scene.add(l); lines.push(l);
    }

    // Minimal lighting for the metallic threat shell.
    scene.add(new THREE.AmbientLight(0xffffff,.35));
    const point=new THREE.PointLight(0xff1738,8,10); point.position.set(2,1,3); scene.add(point);
    const point2=new THREE.PointLight(0xffffff,2,8); point2.position.set(-3,2,2); scene.add(point2);

    let mx=0,my=0;
    addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*.35; my=(e.clientY/innerHeight-.5)*.2},{passive:true});
    const clock=new THREE.Clock();
    function resize(){const r=host.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
    resize(); addEventListener('resize',resize);
    function animate(){
      if(!document.getElementById(id)) return;
      const t=clock.getElapsedTime();
      root.rotation.y += (mx-root.rotation.y)*.018;
      root.rotation.x += (my-root.rotation.x)*.018;
      malware.rotation.y=t*.18; malware.rotation.z=Math.sin(t*.5)*.04;
      shellWire.rotation.y=-t*.23; core.rotation.x=t*.42; coreGlow.scale.setScalar(1+Math.sin(t*4)*.08);
      cage.rotation.y=-t*.06; cage.rotation.z=t*.025;
      ring.rotation.z=t*.32; ring2.rotation.z=-t*.23;
      particles.rotation.y=-t*.018;
      network.rotation.y=t*.025;
      tendrils.forEach((x,i)=>x.rotation.x+=Math.sin(t*1.4+i)*.0018);
      drops.children.forEach((d,i)=>{d.position.y+=Math.sin(t*1.1+i)*.0008; d.rotation.z=t*(.08+(i%3)*.025)});
      lines.forEach((l,i)=>{l.position.z=Math.sin(t*.75+i*.7)*.09});
      point.intensity=6+Math.sin(t*3.2)*2;
      renderer.render(scene,camera); requestAnimationFrame(animate);
    }
    animate();
  }
  window.CyberScene={mount};
})();
