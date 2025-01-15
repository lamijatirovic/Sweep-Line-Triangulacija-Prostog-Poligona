/////////////////////////////////////////////////////pomocne funkcije

			function odrediTipVrha(prethodni, vrh, iduci){

				let cross=(prethodni.x-vrh.x)*(iduci.y-vrh.y)-(prethodni.y-vrh.y)*(iduci.x-vrh.x);

				if(cross<0 && vrh.ispodIliIznad(prethodni)=="iznad" && vrh.ispodIliIznad(iduci)=="iznad"){
					vrh.tip="merge";
					return "merge";
				}else if(cross<0 && vrh.ispodIliIznad(prethodni)=="ispod" && vrh.ispodIliIznad(iduci)=="ispod"){
					vrh.tip="split";
					return "split";
				}else if(cross>0 && vrh.ispodIliIznad(prethodni)=="iznad" && vrh.ispodIliIznad(iduci)=="iznad"){
					vrh.tip="end";
					return "end";
				}else if(cross>0 && vrh.ispodIliIznad(prethodni)=="ispod" && vrh.ispodIliIznad(iduci)=="ispod"){
					vrh.tip="start";
					return "start";
				}else{
					vrh.tip="regular";
					return "regular";
				}	
			}
            
            //ova i naredna funkcija sluze za poredak cvorova kada se stavljaju u randomizirano stablo pretrage
		    function poredakTacakaDogadjaja(vrh1, vrh2){ //prva ako je prva prije, druga ako je druga prije, jednake ako su jednake     
		        if(vrh1.y<vrh2.y){                                                                         
		        	return "prva";
		        }else if(vrh1.y==vrh2.y){
		        	if(vrh1.x<vrh2.x){
		        		return "prva";
		        	}else if(vrh1.x>vrh2.x){
		        		return "druga";
		        	}else if(vrh1.x==vrh2.x){
		        		return "jednake";
		        	}
		        }else if(vrh1.y>vrh2.y){
		        	return "druga";
		        }
		    }

		    function poredakIvica(ivica1, ivica2){
		        let i1=ivica1.presjekSaPokretnomLinijom(yPL);
		        let i2=ivica2.presjekSaPokretnomLinijom(yPL);
		        if(i1.x<i2.x){
		        	return "prva";
		        }else if(i1.x>i2.x){
		        	return "druga";
		        }else{
		        	return "jednake";
		        }
		    }

	        function orientation(p, q, r){  //orijentacija tri vrha (tacke) ako je vrijednost manja od 0 onda su tacke orijentisane clockwise, a ako je veca od nula counterclockwise
	            let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
	            return val;
	        }

	        function vratiPrethodniIndex(i){
	        	if(i==0){
	        		return vrhovi.length-1;
	        	}else{
	        		return i-1;
	        	}
	        }
	        function vratiIduciIndex(i){
	        	if(i==vrhovi.length-1){
	        		return 0;
	        	}else{
	        		return i+1;
	        	}
	        }

            //posljednje dvije funkcije sluze za pomoc kad se poligon zadaje samo tačkama, da bi se zadate tačke sortirale u smjeru suprotnom od kazaljke na satu
			function racunajUgaoIzmedju(s1, s2){
				let n=(s1.pocetak.x-s1.kraj.x)*(s2.kraj.x-s1.kraj.x)+(s1.pocetak.y-s1.kraj.y)*(s2.kraj.y-s1.kraj.y);
				let d=Math.sqrt((s1.kraj.x-s1.pocetak.x)*(s1.kraj.x-s1.pocetak.x)+(s1.kraj.y-s1.pocetak.y)*(s1.kraj.y-s1.pocetak.y))*
				Math.sqrt((s2.kraj.x-s1.kraj.x)*(s2.kraj.x-s1.kraj.x)+(s2.kraj.y-s1.kraj.y)*(s2.kraj.y-s1.kraj.y));
				let alfa=Math.acos(n/d);
				if(s1.pocetak.y>s2.kraj.y) alfa=2*Math.PI-alfa;
				return alfa;
			}

			function poredakVrhovaUSmjeruSuprotnomOdKazaljke(a, b){
				let pocetak=new Vrh(center.x+10, center.y);
				let kraj=new Vrh(center.x, center.y);
				let horizontalnaLinija=new Ivica(pocetak, kraj);

				let s1=new Ivica(kraj, a);
				let s2=new Ivica(kraj, b);

				let u1=racunajUgaoIzmedju(horizontalnaLinija, s1);
				let u2=racunajUgaoIzmedju(horizontalnaLinija, s2);

				if(u1>u2) return "prva";
				else if(u1<u2) return "druga";
				else{
					if(a.y<b.y) return "prva";
					else if(a.y>b.y) return "druga";
					else return "jednake";
				}
			}
