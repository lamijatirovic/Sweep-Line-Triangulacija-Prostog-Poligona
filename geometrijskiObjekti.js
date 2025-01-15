//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	        class Vrh{
	        	constructor(x, y){
	        		this.x=x;
	        		this.y=y;
	        		this.tip;
	        		this.index;
	        		this.pocetakSegmenata=[];
	        	}
	        	crtaj(boja){
	        		ctx.fillStyle=boja;
	        		ctx.fillRect(this.x, this.y, 3, 3);
	        	}
	        	ispodIliIznad(vrh){   //provjerava da li je zadati vrh ispod ili iznad doticnog vrha
					if(this.y<vrh.y){
						return "ispod";
					}else if(this.y>vrh.y){
						return "iznad";
					}else if(this.y==vrh.y){
						if(this.x<vrh.x) return "ispod";
						else return "iznad";
					}
			    }
			}

			class Ivica{
				constructor(pocetak, kraj){
					this.pocetak=pocetak;
					this.kraj=kraj;
					this.iduca;
					this.prethodna;
					this.index;
					this.pomocnik;
				}
				presjekSaPokretnomLinijom(ypl){

					if(this.pocetak.y==this.kraj.y) return new Vrh(1000000, this.kraj.y);

		        	const d = -(1500)*(this.kraj.y-this.pocetak.y);

		        	let ua = ((1500)*(this.pocetak.y-ypl))/d;
		        	let ub = ((this.kraj.x-this.pocetak.x)*(this.pocetak.y-ypl)-(this.kraj.y-this.pocetak.y)*(this.pocetak.x))/d;

		        	let x = this.pocetak.x+ua*(this.kraj.x-this.pocetak.x);
		        	let y = this.pocetak.y+ua*(this.kraj.y-this.pocetak.y);

		        	let tackaPresjeka=new Vrh(x, y);
		        	return tackaPresjeka;
				}
			}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////