import React from 'react';
import Portfolio from './Portfolio';
import '../css/Portfolio.css'

const Home = () => {
  return (
    <div>
      <table className="portfolioTable">
      <tbody>
          <tr>
            <td className="portfolioItemWrapper"><Portfolio name="Jakub Tokarzewski" responsibility="Front-End Developer" portraitUrl="https://stacze.pl/wp-content/uploads/2017/02/kadra-jakub-tokarz-tokarzewski.jpg"/></td>
            <td className="portfolioItemWrapper"><Portfolio name="Antoni Charchuła" responsibility="Full-Stack and PM" portraitUrl="https://media.licdn.com/dms/image/C4D03AQG0rCW2h8ahBA/profile-displayphoto-shrink_200_200/0?e=1553126400&v=beta&t=j0urrge0OtmuqQ7GrmdsmV5i3CUo76AJ5V9uWN-XapA"/></td>
          </tr>
          <tr>
            <td className="portfolioItemWrapper"><Portfolio name="Bartłomiej Kulik" responsibility="Back-End Developer and Database Architect" portraitUrl="https://scontent-waw1-1.xx.fbcdn.net/v/t1.6435-9/50542967_1640362126064322_2954836082585239552_n.jpg?_nc_cat=102&_nc_ht=scontent-waw1-1.xx&oh=f26ed8a1645c2114aaeed4f4657c5a9f&oe=5CC0BAC9"/></td>
            <td className="portfolioItemWrapper"><Portfolio name="Norbert Pietrucha-Kacprowicz" norbs={true} responsibility="Full-Stack" portraitUrl="https://scontent-waw1-1.xx.fbcdn.net/v/t31.0-8/26756670_1809986389069842_5654950923605870911_o.jpg?_nc_cat=107&_nc_ht=scontent-waw1-1.xx&oh=29a289e002244db22dc38d6060fb350d&oe=5CBA86CC"/></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;