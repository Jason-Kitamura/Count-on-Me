import React from 'react';
function Posts() {
    const card={
        width:'100%',
        margin:'10px'
    }
    const img = {
        border: "1px solid #ddd",
        borderRadius: "50%",
        padding: "5px",
        width:'80px',
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'5px'
    }
    const name = {
        textAlign:'center',
        
    }
    return (
    <div>
        <div class="card" style={card}>
            <img style={img}src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.flt4Xq9M4mMny9LVm2SwWgHaHa%26pid%3DApi&f=1" class="card-img-top" alt="..." />
            <h3 style={name}>John</h3>
            <div class="card-body">
                <p class="card-text lead">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
         <div class="card" style={card}>
         <img style={img}src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.yn3SqRavuJc2nyP1um5TygHaHa%26pid%3DApi&f=1" class="card-img-top" alt="..." />
         <h3 style={name}>Chris</h3>
         <div class="card-body">
             <p class="card-text lead">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
         </div>
     </div>
      <div class="card" style={card}>
      <img style={img}src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fc8%2F0a%2Fe0%2Fc80ae037a8d010dbd4caa91ac11336f5.jpg&f=1&nofb=1" class="card-img-top" alt="..." />
      <h3 style={name}>Karen</h3>
      <div class="card-body">
          <p class="card-text lead">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
  </div>
</div>
    );
}

export default Posts;