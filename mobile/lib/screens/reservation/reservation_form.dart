import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/reservation_service.dart';
import '../../models/reservation.dart';

class ReservationFormScreen extends StatefulWidget {
  @override
  _ReservationFormScreenState createState() => _ReservationFormScreenState();
}

class _ReservationFormScreenState extends State<ReservationFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final ReservationService _reservationService = ReservationService();
  
  String? _selectedSeatType;
  String? _selectedSeat;
  String? _selectedPurpose;
  DateTime? _selectedDate;
  TimeOfDay? _startTime;
  TimeOfDay? _endTime;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('예약하기'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              DropdownButtonFormField<String>(
                decoration: InputDecoration(labelText: '좌석 유형'),
                value: _selectedSeatType,
                items: ['1인연구석', '창가석', '아이맥석', '팀프로젝트석']
                    .map((type) => DropdownMenuItem(
                          value: type,
                          child: Text(type),
                        ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedSeatType = value;
                    _selectedSeat = null;
                  });
                },
              ),
              // ... 나머지 폼 필드들
            ],
          ),
        ),
      ),
    );
  }
} 