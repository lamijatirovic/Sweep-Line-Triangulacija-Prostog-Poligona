            ////////////////////////////////////////////////////////////////struktura podataka randomized search tree
			const getRandom=(max, min=1)=>{
				return Math.floor((Math.random()*(max-min+1))+min);
			}

            //Randomized search trea
			const RST=function(funkcijaPoretka){

			const Node=function(data){
			    this.data=data;
			    this.priority=getRandom(1000);
			    this.left=this.right=null;
			}
			  
			let root=null;
			let brojCvorova=0;
			  
			this.returnRoot=function(){
			  	return root;
			}

			this.returnBrojCvorova=function(){
				return brojCvorova;
			}
              
            //pomocne funkcije za rotaciju kad su prekrsena pravila kod insert ili delete
			const rotateLeft = function(root) {
			    const R=root.right;
			    const X=root.right.left;

			    // rotate
			    R.left=root;
			    root.right=X;

			    // set new root
			    return R;
			}			  
			const rotateRight=function(root) {
			    const L=root.left;
			    const Y=root.left.right;

			    // rotate
			    L.right=root;
			    root.left=Y;

			    // set new root
			    return L;
			}
			    
			// Recursive function to search for a key in the given RST
			this.searchNode = function(key){
			  	const searchNodeHelper = (root, key) => {
			        // if key is not present in the key
			        if (root === null) {
			            return false;               
			        }			 
			        // if key is found
			        if (funkcijaPoretka(root.data, key)=="jednake") {
			            return root;
			        }
			 	     // if key is less than the root node, search in the left subtree
			        if (funkcijaPoretka(key, root.data)=="prva") {
			            return searchNodeHelper(root.left, key);
			        }
			 		// else search in the right subtree
			        return searchNodeHelper(root.right, key);
			    }
			    return searchNodeHelper(root, key);
			}

			//Recursive function to insert a given key with a priority into RST
			this.insertNode=function(data) {
			    
			    const insertNodeHelper=(root, data)=>{
			      // base case
			        if (root===null) {
			            return new Node(data);
			        }			 
			        // if data is less than the root node, insert in the left subtree
			        // else insert in the right subtree
			        if (funkcijaPoretka(data, root.data)=="prva"){
			            root.left=insertNodeHelper(root.left, data);		 
			            // rotate right if heap property is violated
			            if (root.left != null && root.left.priority>root.priority) {
			                root=rotateRight(root);
			            }
			        }else{
			            root.right=insertNodeHelper(root.right, data);			 
			            // rotate left if heap property is violated
			            if (root.right!=null && root.right.priority>root.priority) {
			                root=rotateLeft(root);
			            }
			        }
			        return root;
			    }
			    if(!this.searchNode(data)){
				    brojCvorova++; 
				    root = insertNodeHelper(root, data);
			    }
			 }
			  
			 // Recursive function to delete a key from the given RST
			 this.deleteNode=function(key){

			    const deleteNodeHelper=(root, key)=>{
			        // base case: key not found in tree
			        if (root===null) {
			            return null;
			        }
			 	    // if key is less than the root node, recur for left subtree
			        if(funkcijaPoretka(key, root.data)=="prva"){
			            root.left=deleteNodeHelper(root.left, key);
			        }
			        // if key is more than the root node, recur for right subtree
			        else if (funkcijaPoretka(key, root.data)=="druga"){
			            root.right=deleteNodeHelper(root.right, key);
			        }
			        // if key found
			        else{
			            // Case 1: node to be deleted has no children (it is a leaf node)
			            if (root.left==null && root.right==null){
			                // deallocate the memory and update root to null
			                root = null;
			            }
			            // Case 2: node to be deleted has two children
			            else if (root.left!=null && root.right!=null){
			                // if left child has less priority than right child
			                if (root.left.priority<root.right.priority){
			                    // call rotateLeft on root
			                    root = rotateLeft(root);
			 
			                    // recursively delete the left child
			                    root.left = deleteNodeHelper(root.left, key);
			                }else{
			                    // call rotateRight on root
			                    root = rotateRight(root);
			 
			                    // recursively delete the right child
			                    root.right = deleteNodeHelper(root.right, key);
			                }
			            }
			            // Case 3: node to be deleted has only one child
			            else{
			                // find child node
			                const child=(root.left!=null) ? root.left: root.right;
			                root=child;
			            }
			        }
			        return root;
			     }
			    root=deleteNodeHelper(root, key);
			 }
			   
			this.giveMin=function(){
			 	let current=root;
			 	while(current.left!=null){
			 		current=current.left;
			 	}
			 	return current;
			}

			this.giveMax=function(){
			 	let current=root;
			 	while(current.right!=null){
			 		current=current.right;
			 	}
			 	return current;
			}

			this.isEmpty=function(){
				if(root===null) return true;
				return false;
			}

			this.predecessorSuccesor=function(key){
				let pre=null; let suc=null;
				// This function finds predecessor and successor of key in BST. It sets pre and suc as predecessor and successor respectively
				function predecessorHelper(root , key){
				    // Base case
				    if (root==null)
				        return;

				    // If key is present at root
				    if(funkcijaPoretka(root.data, key)=="jednake"){

				        // The maximum value in left subtree is predecessor
				        if (root.left!=null){
				            let tmp=root.left;
				            while(tmp.right!=null)
				                tmp=tmp.right;
				                 
				            pre=tmp;
				        }
				 	    // The minimum value in right subtree is successor
				        if (root.right!=null){
				            let tmp=root.right;
				             while(tmp.left!=null)
				                tmp=tmp.left;
				                 
				            suc = tmp;
				        }
				        return;}

				 	// If key is smaller than root's key, go to left subtree
				    if (funkcijaPoretka(root.data, key)=="druga"){
				        suc=root;
				        predecessorHelper(root.left, key);
				    }
				    // Go to right subtree
				    else{
				        pre=root;
				        predecessorHelper(root.right, key);
				    }
				}
				predecessorHelper(root, key);
				let preSuc=[pre, suc];
				return preSuc;
			}

			 this.print = function() {
			   const printHealper = (root) => {
			    // Base case
			    if (root === null) {
			       return;
			     }

			    // print right child first
			    printHealper(root.right);

			    console.log(root.data);

			    // print left child
			    printHealper(root.left);
			   }
			   printHealper(root);
			 }

		}

        //////////////////////////////struktura podataka koja za potrebe vremenske slozenosti algoritma simulira strukturu Doubly Connected Edge List
		const DCEL = function(vrhoviUSmjeruSuprotnomOdKazaljke){

			this.vrhovi = vrhoviUSmjeruSuprotnomOdKazaljke;

			this.formirajIvice = function(){
				let ivice={};
				let ivica1 = new Ivica(this.vrhovi[0], this.vrhovi[1]);
				ivica1.iduca=1;
				ivica1.prethodna=this.vrhovi.length-1;
				ivica1.index=0;
				ivice[0]=ivica1;

				for(let i=0; i<this.vrhovi.length-2; i++){
					let ivica=new Ivica(this.vrhovi[i+1], this.vrhovi[i+2]);
					ivica.iduca=i+2;
					ivica.prethodna=i;
					ivica.index=i+1;
					ivice[i+1]=ivica;
				}

				let ivica2=new Ivica(this.vrhovi[this.vrhovi.length-1], this.vrhovi[0]);
				ivica2.iduca=0;
				ivica2.prethodna=this.vrhovi.length-2;
				ivica2.index=this.vrhovi.length-1;
				ivice[this.vrhovi.length-1]=ivica2;

				return ivice;
			}

			this.ivice = this.formirajIvice();

			this.lica = [0];

			this.dodajDijagonalu = function(x, y){
	        	let novaIvica1=new Ivica(this.vrhovi[x], this.vrhovi[y]);
	        	novaIvica1.index=String(x)+String(y)+'s';

	        	let novaIvica2=new Ivica(this.vrhovi[y], this.vrhovi[x]);
	        	novaIvica2.index=String(y)+String(x)+'s';

	        	this.lica.push(String(x)+String(y)+'s');
	        	this.lica.push(String(y)+String(x)+'s');
	        	
	        	let i1=this.vrhovi[y].pocetakSegmenata[0];
	        	if(this.vrhovi[y].pocetakSegmenata.length>1){

	        		for(let i=0; i<this.vrhovi[y].pocetakSegmenata.length; i++){
	        			let iterator=this.vrhovi[y].pocetakSegmenata[i];
	        			let provjera=false;
			    		do{
			    			iterator=this.ivice[iterator].iduca;
			    			if(this.ivice[iterator].pocetak.x==this.vrhovi[x].x && this.ivice[iterator].pocetak.y==this.vrhovi[x].y){
			    				provjera=true;
			    			}
			    		}while(!provjera && iterator!=this.vrhovi[y].pocetakSegmenata[i]);

			    	    if(provjera){
			    	    	i1=this.vrhovi[y].pocetakSegmenata[i];
		        			break;
	        		    }
	        		}
	            }

	            let i2=this.vrhovi[x].pocetakSegmenata[0];
	            if(this.vrhovi[x].pocetakSegmenata.length>1){

	        		for(let i=0; i<this.vrhovi[x].pocetakSegmenata.length; i++){
	        			let iterator=this.vrhovi[x].pocetakSegmenata[i];
	        			let provjera=false;
			    		do{
			    			iterator=this.ivice[iterator].iduca;
			    			if(this.ivice[iterator].pocetak.x==this.vrhovi[y].x && this.ivice[iterator].pocetak.y==this.vrhovi[y].y){
			    				provjera=true;
			    			}
			    		}while(!provjera && iterator!=this.vrhovi[x].pocetakSegmenata[i]);

			    	    if(provjera){
			    	    	i2=this.vrhovi[x].pocetakSegmenata[i];
		        			break;
	        		    }
	        		}	            	
	            }

	        	novaIvica1.iduca=i1;
	        	novaIvica2.iduca=i2;

	        	novaIvica1.prethodna=this.ivice[i2].prethodna;
	        	novaIvica2.prethodna=this.ivice[i1].prethodna;

	        	this.vrhovi[x].pocetakSegmenata.push(String(x)+String(y)+'s');
	        	this.vrhovi[y].pocetakSegmenata.push(String(y)+String(x)+'s');

	        	this.ivice[String(x)+String(y)+'s']=novaIvica1;
	        	this.ivice[String(y)+String(x)+'s']=novaIvica2;

	        	let prethodna1=this.ivice[i1].prethodna;
	        	this.ivice[prethodna1].iduca=String(y)+String(x)+'s';
	        	let prethodna2=this.ivice[i2].prethodna;
	        	this.ivice[prethodna2].iduca=String(x)+String(y)+'s';

	        	this.ivice[i1].prethodna=String(x)+String(y)+'s';
	        	this.ivice[i2].prethodna=String(y)+String(x)+'s';
			}
		}