// const obj = {
//     id: 1,
//     name: "name",
//     desc: "kuch",
//     qty: 2
//   }

//   var { id, ...data } = obj
//   console.log(id, data)

const submitbtn = document.getElementById("sub-btn");
submitbtn.addEventListener("click", submission);

function submission(event) {
  event.preventDefault();
  const des = document.getElementById("Description").value;
  const name = document.getElementById("candy-name").value;
  const pri = document.getElementById("Price").value;
  const qty = document.getElementById("Quantity").value;

  const obj = {
    name: name,
    des: des,
    pri: pri,
    qty: qty,
  };

  postdata(obj);
}

async function postdata(accdata) {
  try {
    const response = await axios.post(
      "https://crudcrud.com/api/b8efc605155c4d2d97d324a4a3f2497c/Pratik",
      accdata
    );

    getdata(response.data);
  } catch (err) {
    getdata(err);
  }
}

async function getdata(disdata) {
  try {
    const response = await axios.get(
      `https://crudcrud.com/api/b8efc605155c4d2d97d324a4a3f2497c/Pratik/${disdata._id}`
    );

    const mainlist = document.getElementById("list");
    const newli = document.createElement("li");

    const buy1 = document.createElement("button");
    buy1.id = "1";
    buy1.textContent = "BUY ONE";

    const buy2 = document.createElement("button");
    buy2.id = "2";
    buy2.textContent = "BUY TWO";

    const buy3 = document.createElement("button");
    buy3.id = "3";
    buy3.textContent = "BUY THREE";

    // newli.textContent = JSON.stringify(response.data);
    newli.textContent = `Name: ${response.data.name}, Description: ${response.data.des}, Price: ${response.data.pri}, Quantity: ${response.data.qty}`;
    newli.appendChild(buy1);
    newli.appendChild(buy2);
    newli.appendChild(buy3);
    mainlist.appendChild(newli);

    buy1.addEventListener("click", (event) => update1(event, response.data, 1));
    buy2.addEventListener("click", (event) => update1(event, response.data, 2));
    buy3.addEventListener("click", (event) => update1(event, response.data, 3));
  } catch (err) {
    console.log(err);
  }
}

async function update1(event, accdata, n) {
  event.preventDefault();
  const id = accdata._id;
  if (accdata.qty >= 1) {
    accdata.qty = accdata.qty - n;
  } else {
    accdata.qty = "out of stock";
  }
  const { _id, ...data } = accdata;
  try {
    const response = await axios.put(
      `https://crudcrud.com/api/b8efc605155c4d2d97d324a4a3f2497c/Pratik/${id}`,
      data
    );

    location.reload();
  } catch (err) {
    console.log(err);
  }
}
refresh();

function refresh() {
  window.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await axios.get(
        "https://crudcrud.com/api/b8efc605155c4d2d97d324a4a3f2497c/Pratik"
      );

      response.data.forEach((element) => {
        getdata(element);
      });
    } catch (err) {
      getdata(err);
    }
  });
}
