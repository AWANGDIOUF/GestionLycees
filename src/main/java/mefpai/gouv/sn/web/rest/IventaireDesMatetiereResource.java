package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import mefpai.gouv.sn.domain.IventaireDesMatetiere;
import mefpai.gouv.sn.repository.IventaireDesMatetiereRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.IventaireDesMatetiereService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.IventaireDesMatetiere}.
 */
@RestController
@RequestMapping("/api")
public class IventaireDesMatetiereResource {

    private final Logger log = LoggerFactory.getLogger(IventaireDesMatetiereResource.class);

    private static final String ENTITY_NAME = "iventaireDesMatetiere";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IventaireDesMatetiereService iventaireDesMatetiereService;

    private final IventaireDesMatetiereRepository iventaireDesMatetiereRepository;

    public IventaireDesMatetiereResource(
        IventaireDesMatetiereService iventaireDesMatetiereService,
        IventaireDesMatetiereRepository iventaireDesMatetiereRepository
    ) {
        this.iventaireDesMatetiereService = iventaireDesMatetiereService;
        this.iventaireDesMatetiereRepository = iventaireDesMatetiereRepository;
    }

    /**
     * {@code POST  /iventaire-des-matetieres} : Create a new iventaireDesMatetiere.
     *
     * @param iventaireDesMatetiere the iventaireDesMatetiere to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new iventaireDesMatetiere, or with status {@code 400 (Bad Request)} if the iventaireDesMatetiere has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/iventaire-des-matetieres")
    public ResponseEntity<IventaireDesMatetiere> createIventaireDesMatetiere(@RequestBody IventaireDesMatetiere iventaireDesMatetiere)
        throws URISyntaxException {
        log.debug("REST request to save IventaireDesMatetiere : {}", iventaireDesMatetiere);
        if (iventaireDesMatetiere.getId() != null) {
            throw new BadRequestAlertException("A new iventaireDesMatetiere cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IventaireDesMatetiere result = iventaireDesMatetiereService.save(iventaireDesMatetiere);
        return ResponseEntity
            .created(new URI("/api/iventaire-des-matetieres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /iventaire-des-matetieres/:id} : Updates an existing iventaireDesMatetiere.
     *
     * @param id the id of the iventaireDesMatetiere to save.
     * @param iventaireDesMatetiere the iventaireDesMatetiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated iventaireDesMatetiere,
     * or with status {@code 400 (Bad Request)} if the iventaireDesMatetiere is not valid,
     * or with status {@code 500 (Internal Server Error)} if the iventaireDesMatetiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/iventaire-des-matetieres/{id}")
    public ResponseEntity<IventaireDesMatetiere> updateIventaireDesMatetiere(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody IventaireDesMatetiere iventaireDesMatetiere
    ) throws URISyntaxException {
        log.debug("REST request to update IventaireDesMatetiere : {}, {}", id, iventaireDesMatetiere);
        if (iventaireDesMatetiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, iventaireDesMatetiere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!iventaireDesMatetiereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        IventaireDesMatetiere result = iventaireDesMatetiereService.save(iventaireDesMatetiere);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, iventaireDesMatetiere.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /iventaire-des-matetieres/:id} : Partial updates given fields of an existing iventaireDesMatetiere, field will ignore if it is null
     *
     * @param id the id of the iventaireDesMatetiere to save.
     * @param iventaireDesMatetiere the iventaireDesMatetiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated iventaireDesMatetiere,
     * or with status {@code 400 (Bad Request)} if the iventaireDesMatetiere is not valid,
     * or with status {@code 404 (Not Found)} if the iventaireDesMatetiere is not found,
     * or with status {@code 500 (Internal Server Error)} if the iventaireDesMatetiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/iventaire-des-matetieres/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<IventaireDesMatetiere> partialUpdateIventaireDesMatetiere(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody IventaireDesMatetiere iventaireDesMatetiere
    ) throws URISyntaxException {
        log.debug("REST request to partial update IventaireDesMatetiere partially : {}, {}", id, iventaireDesMatetiere);
        if (iventaireDesMatetiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, iventaireDesMatetiere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!iventaireDesMatetiereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<IventaireDesMatetiere> result = iventaireDesMatetiereService.partialUpdate(iventaireDesMatetiere);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, iventaireDesMatetiere.getId().toString())
        );
    }

    /**
     * {@code GET  /iventaire-des-matetieres} : get all the iventaireDesMatetieres.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of iventaireDesMatetieres in body.
     */
    @GetMapping("/iventaire-des-matetieres")
    public ResponseEntity<List<IventaireDesMatetiere>> getAllIventaireDesMatetieres(Pageable pageable) {
        log.debug("REST request to get a page of IventaireDesMatetieres");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<IventaireDesMatetiere> page = iventaireDesMatetiereService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (iventaireDesMatetiereService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((iventaireDesMatetiereRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /iventaire-des-matetieres/:id} : get the "id" iventaireDesMatetiere.
     *
     * @param id the id of the iventaireDesMatetiere to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the iventaireDesMatetiere, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/iventaire-des-matetieres/{id}")
    public ResponseEntity<IventaireDesMatetiere> getIventaireDesMatetiere(@PathVariable Long id) {
        log.debug("REST request to get IventaireDesMatetiere : {}", id);
        Optional<IventaireDesMatetiere> iventaireDesMatetiere = iventaireDesMatetiereService.findOne(id);
        return ResponseUtil.wrapOrNotFound(iventaireDesMatetiere);
    }

    /**
     * {@code DELETE  /iventaire-des-matetieres/:id} : delete the "id" iventaireDesMatetiere.
     *
     * @param id the id of the iventaireDesMatetiere to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/iventaire-des-matetieres/{id}")
    public ResponseEntity<Void> deleteIventaireDesMatetiere(@PathVariable Long id) {
        log.debug("REST request to delete IventaireDesMatetiere : {}", id);
        iventaireDesMatetiereService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
