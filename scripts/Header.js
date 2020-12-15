class Header extends React.Component {
  state = {
    availabilityFrom: "Seleccione fecha de entrada",
    availabilityTo: "Seleccione fecha de salida",
  };

  textoFecha = (fecha) => {
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const diaLetras = diasSemana[fecha.getDay()];
    //Otro array con los meses
    const meses = new Array(
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    );
    const mesLetras = meses[fecha.getMonth()]; //El mes en letras
    const diaMes = fecha.getDate(); //getDate() devuelve el dia(1-31).
    const year = fecha.getFullYear(); //getFullYear() devuelve el año(4 digitos).
    const fechaCambiada =
      diaLetras + ", " + diaMes + " de " + mesLetras + " de " + year;
    return fechaCambiada;
  };

  updateDate = (dateValue, filterId) => {
    const filtroFecha = dateValue.split("-").join(",");
    const fecha = new Date(filtroFecha);
    this.textoFecha(fecha);
    fecha.setHours(23);
    fecha.setMinutes(59);
    fecha.setSeconds(59);
    this.setState({ [filterId]: this.textoFecha(fecha) });
    this.props.filterHotel(fecha.valueOf(), filterId);
  };

  render() {
    const { filterHotel } = this.props;
    return (
      <div className="header">
        <h1 className="header-title"> Hoteles </h1>

        <p className="date-header">
          Desde el <span className="date">{this.state.availabilityFrom}</span>{" "}
          hasta el <span className="date">{this.state.availabilityTo}</span>
        </p>
        <Filters
          selectCountry={(countryValue, filterId) =>
            filterHotel(countryValue, filterId)
          }
          selectPrice={(priceValue, filterId) =>
            filterHotel(priceValue, filterId)
          }
          selectRooms={(roomsValue, filterId) =>
            filterHotel(roomsValue, filterId)
          }
          sinceDate={this.updateDate}
          untilDate={this.updateDate}
        />
      </div>
    );
  }
}