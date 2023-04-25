import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, TextInput, Pressable, ScrollView } from 'react-native';
import HeaderCircleBlue from '../../components/HeaderCircleBlue';
import { PatientService } from '../../services/patient/PatientService';
import Loading from '../../components/Loading';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DoctorCard from './components/DoctorCard';
import SearchAndFilter from './components/SearchAndFilter';
import { Select } from './components/Select';

const WIDTH = Dimensions.get('window').width

const ListDoctors = ({ navigation }) => {
    const [doctors, setDoctors] = useState([])
    const [filters, setFilters] = useState({
        name: '',
        specialtyId: 0,
        insurance: ''
    })
    const [loading, setLoading] = useState(true)
    const [errorFetch, setErrorFetch] = useState(false)
    const [specialties, setSpecialties] = useState([])
    const [isOpenFilter, setIsOpenFilter] = useState(false)

    const SPECIALTIES_OPTION_LIST = [{value: 0, label: 'Todas Especialidades'}, ...specialties.map(specialtie=>{
        return {
            value: specialtie.id,
            label: specialtie.name
        }
    })]

    const INSURANCE_OPTION_LIST = [
        {value: '', label: 'Sem Filtro de Convênio'},
        {value: 'UNIMED', label: 'UNIMED'},
        {value: 'HAPVIDA', label: 'HAPVIDA'},
        {value: 'BRADESCO', label: 'BRADESCO'}
    ]

    const DOCTORS_FILTER = doctors.filter(doctor => filterDoctorByFilters(doctor))

    function filterDoctorByFilters(doctor){
        if (!doctor.name.toLowerCase().includes(filters.name.toLowerCase()))
            return false
        
        if (filters.specialtyId > 0 && doctor.specialtyId !== filters.specialtyId )
            return false

        if (filters.insurance !== '' && filters.insurance !== doctor.insurance)
            return false

        return true
    }

    const getData = async () => {
        const doctorReq = await PatientService.getDoctorList()

        if (doctorReq.error) {
            setErrorFetch(true)
            setLoading(false)
            return 
        }
        setDoctors(doctorReq.data)

        const specialtiesReq = await PatientService.getSpecialties()

        if(!specialtiesReq.error)
            setSpecialties(specialtiesReq.data)
       
        setLoading(false) 
    }

    const handleFilter = (prop, value) => {
        setFilters({...filters, [prop]: value})
    }

    const handleNavigateByDoctor = (doctor) => {
        navigation.navigate('DOCTOR_PROFILE', {
            doctorId: doctor.id,
        });
    }

    useEffect(()=>{
        getData()
    },[])

    const EmptyState = () => {
        return (
            <View style={styles.emptyContainer}>
                 <FontAwesome5 name={'frown-open'} size={100} style={styles.iconDataEmpty}/>
                 <Text style={styles.textWarningEmpty}>Nenhum Medico foi encontrado no momento</Text>
            </View>
        )
    }

    return (
        <View style={styles.containerBg}>
            <HeaderCircleBlue height={520} top={-350}/>
            <View style={styles.headerContainer}>
                <Text style={styles.titleName}>Medicos</Text>
            </View>
            <View style={styles.bodyContent}>
                {
                    loading ? <Loading /> : errorFetch ? <EmptyState/> : (
                    <>
                        <View>
                            <SearchAndFilter 
                                currentValue={filters.name} 
                                changeValue={(value)=>{handleFilter('name',value)}} 
                                openFilter={()=>setIsOpenFilter(!isOpenFilter)}
                                isOpen={isOpenFilter}
                            />
                            {isOpenFilter && (
                                <View style={styles.selectContainer}>
                                    <Select 
                                        options={SPECIALTIES_OPTION_LIST} 
                                        selectedValue={filters.specialtyId} 
                                        onValueChange={value=>{handleFilter('specialtyId',value)}}
                                    />
                                    <Select 
                                        options={INSURANCE_OPTION_LIST} 
                                        selectedValue={filters.insurance} 
                                        onValueChange={value=>{handleFilter('insurance',value)}}
                                    />
                                </View>
                            )}
                        </View>
                        <ScrollView contentContainerStyle={styles.cardsContainer} align>
                            {
                                DOCTORS_FILTER.map((item)=>{
                                    return <DoctorCard doctor={item} key={item.id} specialties={specialties} navigateDoctor={()=>handleNavigateByDoctor(item)}/>
                                })
                            }
                        </ScrollView>
                    </>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerBg:{
        minHeight:'100%',
        width: '100%',
        paddingTop:StatusBar.currentHeight,
        backgroundColor: '#fff',
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        paddingTop: 60
    },
    headerContainer: {
        position: 'absolute',
        top: 70
    },
    titleName: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bodyContent: {
        width: '100%',
        marginTop: 130,
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 10,
        flex: 1
    },
    emptyContainer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        paddingHorizontal: 20
    },
    iconDataEmpty:{
        color: '#514d4dc3'
    },
    textWarningEmpty: {
        color: '#514d4dc3',
        fontSize: 26,
        textAlign: 'center'
    },
    selectContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 10
    },
    cardsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        flexGrow: 2, 
        justifyContent: 'flex-start',
        alignItems: 'center', 
        overflow: 'scroll', 
    }
})

export default ListDoctors;