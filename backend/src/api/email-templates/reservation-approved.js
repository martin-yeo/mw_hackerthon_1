module.exports = {
  subject: '예약이 승인되었습니다',
  text: `
    안녕하세요 <%= user.name %>님,

    요청하신 FabLab 예약이 승인되었습니다.

    예약 정보:
    - 날짜: <%= reservation.date %>
    - 시간: <%= reservation.startTime %> - <%= reservation.endTime %>
    - 좌석: <%= reservation.seatInfo %>
    - 목적: <%= reservation.purpose %>

    예약 시간에 맞춰 방문해 주시기 바랍니다.
    감사합니다.

    FabLab 관리자
  `,
  html: `
    <div style="font-family: 'Noto Sans KR', sans-serif;">
      <h2>예약이 승인되었습니다</h2>
      <p>안녕하세요 <%= user.name %>님,</p>
      <p>요청하신 FabLab 예약이 승인되었습니다.</p>
      
      <h3>예약 정보</h3>
      <ul>
        <li>날짜: <%= reservation.date %></li>
        <li>시간: <%= reservation.startTime %> - <%= reservation.endTime %></li>
        <li>좌석: <%= reservation.seatInfo %></li>
        <li>목적: <%= reservation.purpose %></li>
      </ul>

      <p>예약 시간에 맞춰 방문해 주시기 바랍니다.</p>
      <p>감사합니다.</p>
      
      <p>FabLab 관리자</p>
    </div>
  `
}; 