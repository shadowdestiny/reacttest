import React from 'react';
import '../../css/all.css';
import axios from 'axios';

class Index extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.onRefresh = this.onRefresh.bind(this);
      this.state = {
        contentConsultCountry: [],
        name:'',
        countries:'',
        year_old:'',
        year_old_date:{
          day:'',
          year:'',
          month:''
        },
        inputs : {
          name:'',
          countries:'',
          year_old:''
        },
        users:[]
      };
    }
    setDateUserCurrent(year_old){
      const state = this.state;
      const date_calculated = this.calculateDate(year_old);
      const arr_date_calculated = date_calculated.split('/');
      state.year_old_date['year'] = arr_date_calculated[2];
      state.year_old_date['month'] = arr_date_calculated[1];
      state.year_old_date['day'] = arr_date_calculated[0];
      this.setState(state);
    }
    onClickLi(data){
      const state = this.state;
      state.inputs.name = data.content.name;
      state.inputs['countries'] = data.content.countries;
      state.inputs['year_old'] = data.content.year_old;
      this.setState(state);
    }
    onClick() {
      const state = this.state;
      const name = state.inputs['name'] = this.state['name'];
      const countries = state.inputs['countries'] = this.state['countries'];
      const year_old = state.inputs['year_old']  = this.state['year_old'];
      const date_year_old_formated = this.calculateDate(year_old);
      state.users.push({
        name                    : name,
        countries               : countries,
        date_year_old_formated  : date_year_old_formated,
        year_old                : year_old
      });

      this.setDateUserCurrent(year_old);
      this.setState(state);
    }
    calculateDate(year_old){
      const now   = new Date();
      const year    = now.getFullYear();
      const month   = now.getMonth();
      const day     = now.getDate();
      const date_calculate =  new Date(year - year_old, month, day);
      return (date_calculate.getUTCHours())+"/"+ (date_calculate.getUTCMonth() + 1) + "/" +date_calculate.getUTCFullYear()
    }
    onChange = (e) => {
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState(state);
    }
    componentWillMount() {
      this.loadContent();
    }
    onRefresh() {
      this.setState({ ...this.state });
      this.loadContent();
    }
    loadContent() {
      axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
        this.setState({
          ...this.state,
          contentConsultCountry: response.data,
        });
      });
    }
    render() {
      const {contentConsultCountry,users,year_old_date} = this.state;
      return (
          <div className="block">
            <div className="title">
              <h2>Ejercicio Inlive</h2>
            </div>
            <div className="title">
              Nombre {this.state.inputs.name}
            </div>
            <br/>
            <div className="content">
              <div className="left">
                <table className="attributes">
                  <tbody>
                  <tr>
                    <td className="left">
                      Nombre
                    </td>
                    <td>
                      <input type="text" name="name" onChange={this.onChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td className="left">
                      Pais
                    </td>
                    <td>
                      <select name="countries" onChange={this.onChange}>
                        <option value=""></option>
                        {contentConsultCountry.map((content,i)=>(
                          <option value={content.name}  key={i}>{content.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="left">
                      Edad
                    </td>
                    <td>
                      <input type="text" name="year_old" onChange={this.onChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="right" >
                      <button onClick={() => this.onClick()}>Saludar</button>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <br />
                <div>
                  Hola {this.state.inputs.name} de {this.state.inputs.countries}, el dia {year_old_date.day} del mes {year_old_date.month} tendrás {this.state.inputs.year_old}
                </div>
              </div>
              <div className="right">
                <span>Visitantes Anteriores</span>
                <div>
                  <ul>
                    {users.map((content,i)=>(
                      <li onClick={() => this.onClickLi({content})} key={i}>{content.name} - {content.countries} - {content.date_year_old_formated}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
      );
    }
}

export default Index;
